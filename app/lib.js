import Table from 'cli-table3'; // Change 'table' to 'Table' to match the class name
import chalk from 'chalk';
const hours = ['05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00','01','02','03','04'];

export function timeRemaining({config}){
  // console.log(new Date(end.split('Z')[0]+'+05:30'));
  // var eod = (new Date(end.split('Z')[0]+'+05:30') - new Date())/1000/60;// time remaining to eod in mins
  var eod = (config.end.split('Z')[0]+'+05:30');
  // var time_remaining={
  //  'Work': (eod-12*60)>0?eod-12*60:0, // 12 hours before eod
  //  'Buffer':(eod-10*60)>0?eod-10*60:0, // 10 hours before eod
  //  'Family':(eod-7*60)>0?eod-7*60:0, // 7 hours before
  //  'Day':eod,
  // }
  var time_remaining={
      Workable:{},
      "  Work":{},
      "  Buffer":{},
      Family:{},
      Day:{},
  }
  var date = config.start.substring(0,10);
  Object.keys(time_remaining).forEach(function(key){
      var stw,etw;
      if(key=='  Work'){
          stw = new Date(date+"T06:00:00+05:30"); // start of time window
          etw = new Date(date+"T17:00:00+05:30"); // end of time window
      }
      else if(key=='  Buffer'){
          stw = new Date(date+"T17:00:00+05:30"); // start of time window
          etw = new Date(date+"T19:00:00+05:30"); // end of time window
      }
      else if(key=='Workable'){
          stw = new Date(date+"T06:00:00+05:30"); // start of time window
          etw = new Date(date+"T19:00:00+05:30"); // end of time window
      }
      else if(key=='Family'){
          stw = new Date(date+"T19:00:00+05:30"); // start of time window
          etw = new Date(date+"T22:00:00+05:30"); // end of time window
      }
      else if(key=='Day'){
          stw = new Date(date+"T05:00:00+05:30"); // start of time window
          etw = new Date(eod); // end of time window
      }
      var now = new Date();
      var max_time=(etw-stw)/1000/60; // in mins
      var time = max_time;
      if(now<stw)
          time = max_time;
      else if (now<etw)
          time = (etw-now)/1000/60;
      else
          time=0;
      var over = max_time-time;
      time_remaining[key]={
          'remaining_raw':time/60,
          'Max':`${parseInt(max_time/60)}h`,
          'Over':over?`${parseInt(over/60)}h ${(over%60).toFixed(0)}m`:'',
          'Over %':(over/max_time*100).toFixed(0)+' %',
          'Remaining':time?`${parseInt(time/60)}h ${(time%60).toFixed(0)}m`:'',
          'Remaining %':(time/max_time*100).toFixed(0)+' %',
      }
  })
  
  // console.table(time_remaining);

  
  var headers=[];
  Object.keys(time_remaining['Workable']).forEach(function(h){
    if(h=='remaining_raw')
      return;
    headers.push(h);
  })
  // instantiate
  var table = new Table({
      head: [''].concat(headers),
      colAligns:['left','right','right','right','right','right']
    // , colWidths: [10, 20]
  });
  

  // table is an Array, so you can `push`, `unshift`, `splice` and friends
  Object.keys(time_remaining).forEach(function(key){
    
    var row = [key];
    headers.forEach(function(h){
        row.push(time_remaining[key][h]);
    })
    table.push(row);
  })
  
  // console.log(table.toString());
  return {time_remaining,table};

}
export function hourlyStats({entries}){
	
	
	var hourly_stats={}
	// var line=''; // to delete
	hours.forEach(function(hour){
		var hour_total={
			recorded:0,
			distractions:0,
			personal:0,
			useful:0
		}
		entries.forEach(function(e){
			if(e.hour==hour){
				hour_total.recorded+=e.time;
				if(!e.project || e.project=='Distraction')
					hour_total.distractions+=e.time;
				else if(e.project=='Personal')
					hour_total.personal+=e.time;
				else
					hour_total.useful+=e.time;
			}
		})
		hourly_stats[hour]=hour_total;
	})
	return hourly_stats;

}
export function todayStats({entries}){
  var hourly_stats = hourlyStats({entries});
  var useful_work_during_work_window=0;
  var day_total={
    recorded:0,
    distractions:0,
    personal:0,
    useful:0
  };
  Object.keys(hourly_stats).forEach(function(hour){
    day_total.recorded+=hourly_stats[hour].recorded;
    day_total.distractions+=hourly_stats[hour].distractions;
    day_total.personal+=hourly_stats[hour].personal;
    day_total.useful+=hourly_stats[hour].useful;
    if(parseInt(hour)>=6 && parseInt(hour)<19){ // including buffer zone
      useful_work_during_work_window+=hourly_stats[hour].useful;
    } 
  })
  var table = new Table({
      colAligns:['left','right']
  });

  table.push(
    {recorded:chalk.yellow((day_total.recorded/60).toFixed(1)+' hrs')},
    {personal:chalk.yellow((day_total.personal/60).toFixed(1)+' hrs')},
    {distractions:chalk.red((day_total.distractions/60).toFixed(1)+' hrs')},
    {'total useful':chalk.green((day_total.useful/60).toFixed(1)+' hrs')},
    {'during work window':chalk.green((useful_work_during_work_window/60).toFixed(1)+' hrs')},
    // {'Work over':time_remaining['Work']['Over']},
    {'Work Hr Utilisation':(useful_work_during_work_window/11/60*100).toFixed(0)+'% / 82%'},
    // {'Day over':time_remaining['Day']['Over']},
    {'Day Utilisation':(day_total.useful/24/60*100).toFixed(0)+'% / 38%'},
  );
  // console.log(table.toString());

  return {day_total,table};
}

import 'server-only';
import { redirect } from "next/navigation";
import LandingPage from './LandingPage';
import moment from 'moment-timezone'; // Import moment-timezone
import fs from 'fs'; // Import fs
import path from 'path';
import Table from 'cli-table3'; // Change 'table' to 'Table' to match the class name
import chalk from 'chalk';

const hours = ['05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00','01','02','03','04'];
async function getData({config={}}) {
  
  console.log('>>>>>>>> Getting time entries from Clockify');

  var data = [];
  // console.log(config);
  var params = `start=${config.start}&end=${config.end}&hydrated=true&page-size=5000`;
  var response = await fetch(`https://api.clockify.me/api/v1/workspaces/${config.workspace}/user/${config.user}/time-entries?${params}`, {
    method: 'GET',
    headers: {
      'X-Api-Key': config.api_key,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseData = await response.json();

  responseData.forEach(function (d) {
    var nd = {
      "id": d.id,
      "Department": d?.project?.clientName,
      "Project": d?.project?.name,
      "Description": d.description,
      "Task": d.task,
      "User": config.user_name,
      "Tags": d.tags,
      "Billable": d.billable,
      "Start Date": moment(d.timeInterval.start).format('DD/MM/YYYY'),
      "Start Time": moment(d.timeInterval.start).format('HH:mm:ss'),
      "End Date": d.timeInterval.end ? moment(d.timeInterval.end).format('DD/MM/YYYY') : moment().format('DD/MM/YYYY'),
      "End Time": d.timeInterval.end ? moment(d.timeInterval.end).format('HH:mm:ss') : moment().format('HH:mm:ss'),
    }
    data.push(nd);
  });

  // Ensure the temp directory exists
  const tempDir = path.join(process.cwd(), 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  fs.writeFileSync(path.join(tempDir, "clockify_raw.json"), JSON.stringify(data, 2, 2));
  console.log('got time');
  return data;
};

function processTimeEntries(){
	var data = JSON.parse(fs.readFileSync('./temp/clockify_raw.json'));

	var entries = [];
	data.forEach(function (d) {
	    // console.log(d["Start Time"],d["End Time"]);
	    var sh = d["Start Time"].split(':')[0];
	    var eh = d["End Time"].split(':')[0];

	    var start_time = d['Start Date'].split('/').reverse().join('-') + ' ' + d['Start Time'];
	    var end_time = d['End Date'].split('/').reverse().join('-') + ' ' + d['End Time'];
	    // console.log(start_time, new Date(start_time+' GMT+0000'));
	    // console.log(start_time, moment(start_time).startOf('hour'));
	    // console.log(end_time, new Date(end_time));
	    // console.log(start_time, end_time);

	    // var block_start = d['Start Date'].split('/').reverse().join('-') + ' ' + d['Start Time'].split(':')[0]+':00:00';
	    var block_start = moment(start_time).startOf('hour');
	    // console.log('==',block_start);
	    let i = 0
	    while (block_start < moment(end_time)) {
	        var start = block_start > moment(start_time) ? moment(block_start) : moment(start_time);
	        // console.log('   - start =',start);
	        var block_end = block_start.clone().add(1, 'hours');
	        var end = block_end < moment(end_time) ? moment(block_end) : moment(end_time);
	        var time = (end - start) / 1000 / 60;
	        // console.log(' - ', block_start.format('YYYY-MM-DD - HH'), ' - ', time);
	        var entry = {
	            id: d.id + `_${i}`,
	            entry_id: d.id,
	            project: d["Project"],
	            department: d["Department"],
	            description: d["Description"],
	            // task:d["Task"],
	            user: d["User"],
	            date: block_start.format('YYYY-MM-DD'),
	            hour: block_start.format('HH'),
	            time: time,
	        }
	        entries.push(entry);
	        block_start.add(1, 'hours');
	        // console.log('   - ',start,' - ', end, ' - ',time);
	        // block_start
	        i++
	    }
	})

	fs.writeFileSync('./temp/time_entry.json', JSON.stringify(entries, 2, 2));
	return entries;
	// console.log('>>>>>>>> temp/time_entry.json file created');
};

function timeRemaining({config}){
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
function hourlyStats({entries}){
	
	
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
function todayStats({entries}){
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


export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function Home() {
  let config = {}
  let days=1;
  let date = new Date().getTime()-24*60*60*1000*(days-1)
  date=new Date(date).toISOString().substring(0,10);
  let start = date+"T05:00:00Z";
  let today = new Date().toISOString().substring(0,10)+"T05:00:00Z";
  let end = new Date(today).getTime()+24*60*60*1000;
  end=new Date(end).toISOString();
  config.start=start;
  config.end=end;
  const d = {
    user: process.env.CLOCKIFY_USER,
    workspace: process.env.CLOCKIFY_WORKSPACE,
    api_key: process.env.CLOCKIFY_APIKEY,
  }
  config = {...config, ...d};
  const data = await getData({config});
  const entries = processTimeEntries();
  let {time_remaining,table:time_remaining_table}=timeRemaining({config});
    
  let {day_total,table:today_stats_table}=todayStats({entries});
  
  return <LandingPage timeRemaining={time_remaining} dayTotal={day_total}/>
}
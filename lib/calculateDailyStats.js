export default function dailyStats(timeEntries){
  var daily_stats={};
  timeEntries.forEach(function(e){
    // console.log(e.date);
    if(!daily_stats[e.date]){
      daily_stats[e.date]={
        date:e.date,
        recorded:0,
        distraction:0,
        traction:0,
      }
    }
  })

  timeEntries.forEach(function(e){
    daily_stats[e.date].recorded+=e.time;
    
    if(!e.department)
      daily_stats[e.date].distraction+=e.time;
    else
      daily_stats[e.date].traction+=e.time;
  })
  let daily_stats_array=[];
  Object.keys(daily_stats).forEach(function(key){
    daily_stats_array.push(daily_stats[key]);
  })  
  return daily_stats_array;
}
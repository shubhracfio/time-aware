import moment from 'moment-timezone'; // Import moment-timezone

function generateTimeEntriesWithNthHour(entries){
  let day_starts_at = 22;
  let diff = 0;
  if(day_starts_at>12){
    diff = 24-day_starts_at; // add this number to all values
  }
  entries.forEach(function(e){
    e.nth_hour=parseInt(e.hour)+diff;
    if(e.nth_hour>=24){
      e.nth_hour -= 24;
      e.nth_date = new Date(e.date);
      e.nth_date.setDate(e.nth_date.getDate() + 1);
      e.nth_date=moment(e.nth_date).format('YYYY-MM-DD');
    }else{
      e.nth_date=e.date;
    }
  })
  return entries;
}


export default function processTimeEntries(clockify_raw){

	var entries = [];
	clockify_raw.forEach(function (d) {
    // console.log(d["StartTime"],d["EndTime"]);
    var sh = d["StartTime"].split(':')[0];
    var eh = d["EndTime"].split(':')[0];

    var start_time = d['StartDate'].split('/').reverse().join('-') + ' ' + d['StartTime'];
    var end_time = d['EndDate'].split('/').reverse().join('-') + ' ' + d['EndTime'];
    // console.log(start_time, new Date(start_time+' GMT+0000'));
    // console.log(start_time, moment(start_time).startOf('hour'));
    // console.log(end_time, new Date(end_time));
    // console.log(start_time, end_time);

    // var block_start = d['StartDate'].split('/').reverse().join('-') + ' ' + d['StartTime'].split(':')[0]+':00:00';
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
  entries = generateTimeEntriesWithNthHour(entries);
  console.log('test');
	return entries;
};
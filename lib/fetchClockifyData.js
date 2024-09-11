import moment from 'moment-timezone'; // Import moment-timezone
import fs from 'fs'; // Import fs
import path from 'path';
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

export default async function fetchClockifyData(config){
  
  const d = {
    user: process.env.CLOCKIFY_USER,
    workspace: process.env.CLOCKIFY_WORKSPACE,
    api_key: process.env.CLOCKIFY_APIKEY,
  }
  config = {...config, ...d};
  const data = await getData({config});
  const entries = processTimeEntries();
  return entries;
}
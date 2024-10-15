import moment from 'moment-timezone'; // Import moment-timezone

export default async function getData({config={}}) {
  const d = {
    user: process.env.CLOCKIFY_USER,
    workspace: process.env.CLOCKIFY_WORKSPACE,
    api_key: process.env.CLOCKIFY_APIKEY,
  }
  config = {...config, ...d};
  console.log('>>>>>>>> Getting time entries from Clockify');
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
  // Transform the data
  const transformedData = responseData.map(d => ({
    "id": d.id,
    "Department": d?.project?.clientName||'Undefined',
    "Project": d?.project?.name||'Undefined',
    "Description": d.description||'Undefined',
    "Task": d.task||'Undefined',
    // "User": config.user_name,
    "Tags": d.tags,
    "Billable": d.billable,
    "StartDate": moment(d.timeInterval.start).format('YYYY-MM-DD'),
    "StartTime": moment(d.timeInterval.start).format('HH:mm:ss'),
    "EndDate": d.timeInterval.end ? moment(d.timeInterval.end).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
    "EndTime": d.timeInterval.end ? moment(d.timeInterval.end).format('HH:mm:ss') : moment().format('HH:mm:ss'),
  }));
  return transformedData;
};
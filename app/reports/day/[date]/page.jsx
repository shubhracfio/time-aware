import * as _ from 'lodash';
import rawTimeEntries from '@/temp/time_entry2.json';
import ViewDailyReport from "./ViewDailyReport"

export default function Page({params,searchParams}){
  var timeEntries = _.filter(rawTimeEntries, entry => {
    let include=false;
    include=(entry.nth_date == params.date );
    if(include && searchParams.description)
      include=(entry.description==searchParams.description)
    else if(include && searchParams.project)
      include=(entry.project==searchParams.project)
    else if(include && searchParams.department)
      include=(entry.department==searchParams.department)
    return include;
  });

  return (
    <>
      
      {/* <pre>{JSON.stringify(params,null,2)}</pre> */}
      {/* <pre>{JSON.stringify(rawTimeEntries,null,2)}</pre> */}
      {/* <pre>{JSON.stringify(timeEntries,null,2)}</pre> */}
      <ViewDailyReport params={params} searchParams={searchParams} timeEntries={timeEntries}/>
    </>
  )
}
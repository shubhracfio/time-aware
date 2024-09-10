import * as _ from 'lodash';
import rawTimeEntries from '@/temp/time_entry2.json';
import ViewDailyReport from "./ViewDailyReport"

export default function Page({params,searchParams}){
  var timeEntries = _.filter(rawTimeEntries, { nth_date: params.date });
  return (
    <>
      <ViewDailyReport params={params} searchParams={searchParams} timeEntries={timeEntries}/>
    </>
  )
}
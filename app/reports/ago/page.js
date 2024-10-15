import * as _ from 'lodash';
import rawTimeEntries from '@/temp/time_entry_for_report2.json';
import rawDailyStats from '@/temp/daily_stats.json';
import TimeAgoReport from "./TimeAgoReport"
import calculateDailyStats from '@/lib/calculateDailyStats';
import UpdateReportData from '@/components/UpdateReportData/UpdateReportData';

export default function Page({params,searchParams}){
  var timeEntries = _.filter(rawTimeEntries, entry => {
    let include=false;
    include=(entry.nth_date >= searchParams.from && entry.nth_date <= searchParams.to);
    if(include && searchParams.description)
      include=(entry.description==searchParams.description)
    else if(include && searchParams.project)
      include=(entry.project==searchParams.project)
    else if(include && searchParams.department)
      include=(entry.department==searchParams.department)
    return include;
    
    
    
    
    // const entryDate = new Date(entry.nth_date);
    // const fromDate = new Date(searchParams.from);
    // const toDate = new Date(searchParams.to);
    // return entryDate >= fromDate && entryDate <= toDate;
  });

  // var dailyStats= _.filter(rawDailyStats, entry => {
  //   return entry.date >= searchParams.from && entry.date <= searchParams.to;
  // });
  let dailyStats=calculateDailyStats(timeEntries);
  return (
    <>
      <UpdateReportData/>
      <TimeAgoReport params={params} searchParams={searchParams} timeEntries={timeEntries} dailyStats={dailyStats}/>
    </>
  )
}




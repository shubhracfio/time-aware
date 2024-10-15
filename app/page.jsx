import 'server-only';
import { redirect } from "next/navigation";
import LandingPage from './LandingPage';
import generateConfig from '@/lib/generateClockifyConfig';
import fetchClockifyData from '@/lib/fetchClockifyData';
import convertToTimeEntries from '@/lib/convertToTimeEntries';
import { timeRemaining,todayStats } from './lib';
import async from 'async';
import db from '@/database';


export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function Page({params,searchParams}) {
  let config = generateConfig(1);

  let workflow = {
    getDataFromClockify:async()=>{
      return await fetchClockifyData({config});
    },
    updateClockifyRawDB:['getDataFromClockify',async(results)=>{
      
      // Bulk create or update the entries
      await db.ClockifyRaw.bulkCreate(results.getDataFromClockify, {
        updateOnDuplicate: [
          'Department', 'Project', 'Description', 'Task', 'Tags', 'Billable',
          'StartDate', 'StartTime', 'EndDate', 'EndTime'
        ],
        // returning: true // This option makes bulkCreate return the created/updated instances
      });
      // console.log(`${createdEntries.length} Clockify entries created/updated successfully`);
      console.log('Clockify data imported successfully');
      // return createdEntries; // You can now use these instances if needed
    }],
    updateTimeEntries:['getDataFromClockify',async function(results){
      let entries = convertToTimeEntries(results.getDataFromClockify);
      await db.TimeEntry.bulkCreate(entries, {
        updateOnDuplicate: [
          'entry_id', 'project', 'department', 'description', 'date', 'hour',
          'nth_hour', 'nth_date'
        ],
        // returning: true // This option makes bulkCreate return the created/updated instances
      });
      // console.log(`${createdEntries.length} Clockify entries created/updated successfully`);
      console.log('Clockify data imported successfully');
      return entries;
    }]

  }

   
  
  try{
    var results = await async.auto(workflow)
  }catch(e){
    throw e;
  }

  let {time_remaining,table:time_remaining_table}=timeRemaining({config});
    
  let {day_total,table:today_stats_table}=todayStats({entries:results.updateTimeEntries});
  
  return <LandingPage timeRemaining={time_remaining} dayTotal={day_total} searchParams={searchParams}/>
}
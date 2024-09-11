import 'server-only';
import { redirect } from "next/navigation";
import LandingPage from './LandingPage';
import generateConfig from '@/lib/generateClockifyConfig';
import fetchClockifyData from '@/lib/fetchClockifyData';
import { timeRemaining,todayStats } from './lib';

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function Page({params,searchParams}) {
  let config = generateConfig(1);
  let entries = await fetchClockifyData(config)||[];
  console.log(entries);
  let {time_remaining,table:time_remaining_table}=timeRemaining({config});
    
  let {day_total,table:today_stats_table}=todayStats({entries});
  
  return <LandingPage timeRemaining={time_remaining} dayTotal={day_total} searchParams={searchParams}/>
}
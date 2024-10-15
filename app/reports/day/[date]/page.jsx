import * as _ from 'lodash';
import ViewDailyReport from "./ViewDailyReport"
// import UpdateReportData from '@/components/UpdateReportData/UpdateReportData';
import db from '@/database';

export default async function Page({params, searchParams}) {
  var where = {
    nth_date: params.date,
    description:searchParams.description,
    project:searchParams.project,
    department:searchParams.department,
    hour:searchParams.hour,
  }
  // where = _.pickBy(where, _.identity);
  where = _.pickBy(where);
  var timeEntries = await db.TimeEntry.findAll({
    where: where,
    raw:true
  });
  return (
    <>
      {/* <UpdateReportData/> */}
      {/* <pre>{JSON.stringify(params,null,2)}</pre> */}
      {/* <pre>{JSON.stringify(rawTimeEntries,null,2)}</pre> */}
      {/* <pre>{JSON.stringify(timeEntries,null,2)}</pre> */}
      {/* {timeEntries.length} */}
      <ViewDailyReport params={params} searchParams={searchParams} timeEntries={timeEntries}/>
    </>
  )
}
import _ from 'lodash';
import { Typography, Stack } from "@mui/joy"
import {Table,Link} from 'switchless'


function summarizeByProject(timeEntries){
  let projects = [...new Set(timeEntries.map(entry => entry.project))];
  let summary=[];
  projects.forEach(function(project){
    let s = {
      group:project,
      value:0,
    }
    timeEntries.forEach(function(entry){
      if(entry.project==project)
        s.value+=entry.time
    })
    summary.push(s);
  })
  return _.orderBy(summary, ['value'], ['desc']);
}
function summarizeByDepartment(timeEntries){
  let departments = [...new Set(timeEntries.map(entry => entry.department))];
  let summary=[];
  departments.forEach(function(department){
    let s = {
      group:department,
      value:0,
    }
    timeEntries.forEach(function(entry){
      if(entry.department==department)
        s.value+=entry.time
    })
    summary.push(s);
  })
  return _.orderBy(summary, ['value'], ['desc']);
}

function summarizeByDescription(timeEntries){
  let descriptions = [...new Set(timeEntries.map(entry => entry.description))];
  let summary=[];
  descriptions.forEach(function(description){
    let s = {
      group:description,
      value:0,
    }
    timeEntries.forEach(function(entry){
      if(entry.description==description)
        s.value+=entry.time
    })
    summary.push(s);
  })
  return _.orderBy(summary, ['value'], ['desc']);
}


function displayTime(time){
  let hours = parseInt(time/60);
  let mins = parseInt(time%60);
  let formattedTime= `${hours} hrs ${mins} mins`
  return formattedTime;
}

export default function SummarizeTimeEntries({timeEntries,searchParams}){
  let projectSummary = summarizeByProject(timeEntries);
  let departmentSummary = summarizeByDepartment(timeEntries);
  let descriptionSummary = summarizeByDescription(timeEntries);
  return (
    <>
      <Typography level="h3"> Summary:</Typography>
      {/* <p>count = {timeEntries.length}</p> */}
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={2} 
        useFlexGap 
        // flexWrap="wrap"
      >
        <Table>
          <thead>
            <tr>
              <th style={{ width: 350 }}>Department</th>
              <th style={{ width: 150 }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {departmentSummary.map((s)=>(
              <tr key={s.id}>
                <td>{s.group}</td>
                <td><Link href={`?from=${searchParams.from}&to=${searchParams.to}&department=${encodeURIComponent(s.group)}`}>{displayTime(s.value)}</Link></td>
              </tr> 
            ))}
          </tbody>
        </Table>
        <Table>
          <thead>
            <tr>
              <th style={{ width: 350 }}>Project</th>
              <th style={{ width: 150 }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {projectSummary.map((s)=>(
              <tr key={s.id}>
                <td>{s.group}</td>
                <td><Link href={`?from=${searchParams.from}&to=${searchParams.to}&project=${s.group}`}>{displayTime(s.value)}</Link></td>
              </tr> 
            ))}
          </tbody>
        </Table>
        <Table>
          <thead>
            <tr>
              <th style={{ width: 350 }}>Description</th>
              <th style={{ width: 150 }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {descriptionSummary.map((s)=>(
              <tr key={s.id}>
                <td>{s.group}</td>
                <td><Link href={`?from=${searchParams.from}&to=${searchParams.to}&description=${s.group}`}>{displayTime(s.value)}</Link></td>
              </tr> 
            ))}
          </tbody>
        </Table>
      </Stack>
      {/* <pre>{JSON.stringify(summary,null,2)}</pre> */}
    </>
  )
}
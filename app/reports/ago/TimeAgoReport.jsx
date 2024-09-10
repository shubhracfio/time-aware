'use client';
import ReactECharts from 'echarts-for-react';
import {useRef} from 'react';
import {Grid,FormControl,FormLabel,Input,Button,Typography} from '@mui/joy'
// import { submitTimeAgoReport } from './actions';
import { useRouter } from 'next/navigation';
import SummarizeTimeEntries from '@/components/SummarizeTimeEntries';


let generateChartOption= function(dailyStats){
 
  // let departments = [...new Set(timeEntries.map(entry => entry.department))];
  
  
  let traction = {
    name:'traction',
    type: 'bar',
    stack: 'Total',
    data: [],
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(180, 180, 180, 0.03)'
    },
    itemStyle: {
      color: '#9FE080'
      // color: 'green'
    }
  }
  let distraction={
    name:'distraction',
    type: 'bar',
    stack: 'Total',
    data: [],
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(180, 180, 180, 0.03)'
    },
    itemStyle: {
      color: '#EE6666'
    }
  }
  
  dailyStats?.forEach(function(d){
    // recorded.data.push(d.recorded/60);
    traction.data.push((d.traction/60).toFixed(1));
    // traction.data.push(d.recorded);
    distraction.data.push((d.distraction/60).toFixed(1));
  })
  traction.data=traction.data.reverse();
  distraction.data=distraction.data.reverse();
 
  

  const option = {
    
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
    },
    legend: {
      data: ['traction','distraction','recorded']
    },
    xAxis: {
      type: 'category',
      data: dailyStats?.map(stat => stat.date).reverse() || [],
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 24,
      interval: 4
    },
    series: [traction,distraction],
  };
  return option;
}

function Filter({searchParams}){
  const router = useRouter();
  const filterForm = useRef(null);
  function updateFilter(){
    
    const formData = new FormData(filterForm.current);
		const dateFrom = formData.get('date_from');
		const dateTo = formData.get('date_to');

    console.log('Date From:', dateFrom);
    console.log('Date To:', dateTo);
    router.push(`/reports/ago?from=${dateFrom}&to=${dateTo}`);
  }
  return (
    <form ref={filterForm}>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <FormLabel>Date from:</FormLabel>
            <Input
              name="date_from"
              type="date"
              defaultValue={searchParams.from || ""}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <FormLabel>Date to:</FormLabel>
            <Input
              name="date_to"
              type="date"
              defaultValue={searchParams.to || ""}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button onClick={updateFilter} fullWidth>Update</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default function TimeAgoReport({params,searchParams,timeEntries,dailyStats}){
  
  
  const option = generateChartOption(dailyStats);
  // let departments = [...new Set(timeEntries.map(entry => entry.department))];
  
  return (
    <>
      
      <Typography level="h1" sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Time Ago report
      </Typography>
      <Filter searchParams={searchParams}/>
      <br/>
      <ReactECharts option={option}/>
      <SummarizeTimeEntries timeEntries={timeEntries} searchParams={searchParams}/>
    </>
  )
}


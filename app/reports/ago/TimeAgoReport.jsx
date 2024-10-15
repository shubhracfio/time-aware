'use client';
import ReactECharts from 'echarts-for-react';
import {useRef} from 'react';
import {Grid,FormControl,FormLabel,Input,Button,Typography} from '@mui/joy'
// import { submitTimeAgoReport } from './actions';
import { useRouter } from 'next/navigation';
import SummarizeTimeEntries from '@/components/SummarizeTimeEntries';


let generateChartOption= function(dailyStats){
 
  // let departments = [...new Set(timeEntries.map(entry => entry.department))];
  
  
  
  // Create a continuous date range
  const sortedDailyStats = dailyStats.sort((a, b) => new Date(a.date) - new Date(b.date));
  const startDate = new Date(sortedDailyStats[0].date);
  const endDate = new Date(sortedDailyStats[sortedDailyStats.length - 1].date);
  const dateRange = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateRange.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Fill in missing data with zeros
  const filledData = dateRange.map(date => {
    const stat = dailyStats.find(s => s.date === date);
    return {
      date,
      traction: stat ? (stat.traction / 60).toFixed(1) : '0.0',
      distraction: stat ? (stat.distraction / 60).toFixed(1) : '0.0'
    };
  });
  console.log('weekends',generateWeekendAreas(dateRange));
  console.log('dateRange',dateRange);
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
    },
    // markArea: {
    //   itemStyle: {
    //     color: 'rgba(0, 0, 0, 0.1)'
    //   },
    //   data: generateWeekendAreas(dateRange)
    // }
  }
  let distraction={
    name:'distraction',
    type: 'bar',
    stack: 'Total',
    data: [],
    // showBackground: true,
    // backgroundStyle: {
    //   color: 'rgba(180, 180, 180, 0.03)'
    // },
    itemStyle: {
      color: '#EE6666'
    }
  }
  
  // Update traction and distraction data
  traction.data = filledData.map(d => d.traction);
  distraction.data = filledData.map(d => d.distraction);

  // Create day of week labels
  const dayLabels = dateRange.map(date => {
    const day = new Date(date).getDay();
    return ['S', 'M', 'T', 'W', 'T', 'F', 'S'][day];
  });

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
      data: dateRange,
      axisLabel: {
        formatter: (value, index) => {
          return `${dayLabels[index]}`;
        },
        align: 'center',
        interval: 0,
        rotate: 0
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      // max: 24,
      // interval: 4
    },
    series: [traction,distraction],
  };
  return option;
}

function generateWeekendAreas(dateRange) {
  const weekendAreas = [];
  let weekendStart = null;

  dateRange.forEach((date, index) => {
    const day = new Date(date).getDay();
    if (day === 6 && weekendStart === null) { // Saturday
      weekendStart = date;
    } else if (day === 0) { // Sunday
      if (weekendStart) {
        weekendAreas.push([
          { name: 'S   S', xAxis: weekendStart },
          {xAxis: weekendStart },
          // { xAxis: date }
        ]);
        weekendStart = null;
      }
    } else if (weekendStart) {
      weekendAreas.push([
        { name: 'Weekend2', xAxis: weekendStart },
        { xAxis: dateRange[index - 1] }
      ]);
      weekendStart = null;
    }
  });

  // Handle case where the last day in range is Saturday
  if (weekendStart) {
    weekendAreas.push([
      { name: 'Weekend3', xAxis: weekendStart },
      { xAxis: dateRange[dateRange.length - 1] }
    ]);
  }

  return weekendAreas;
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


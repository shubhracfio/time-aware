'use client';
import { Typography, IconButton,Stack } from '@mui/joy';
import { Link } from 'switchless';
import ReactECharts from 'echarts-for-react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from 'next/navigation';
import SummarizeTimeEntries from '@/components/SummarizeTimeEntries';

let generateChartOption= function(timeEntries){
  const hours = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
 
  let departments = [...new Set(timeEntries.map(entry => entry.department))];
  const departmentColors = {
    'IM Gears': '#8c8888',
    'System': '#36A2EB',
    'P&L': '#FFCE56',
    'null': '#4BC0C0',
    'Customer Acquisition': '#FF9F40',
    'Delivery': '#9966FF',
    'Development / Tech': '#bee843',
    'PLG': '#4ECDC4',
    'Production Line': '#7CB342',
    'Distraction': '#FF4500'  // Added new item with a different shade of red
  };
  let series=[];
  departments.forEach(function(department){
    
    let data = [];
    hours.forEach(function(hr){
      let t = 0;
      timeEntries.forEach(function(e){
        if(!e.department)
          e.department='Distraction';
        if(e.nth_hour==parseInt(hr) && e.department==department){
          t+=e.time;
        }
      })
      // data.push(t);
      data.push(parseInt(t));
    })
    series.push({
      name:department,
      type: 'bar',
      stack: 'Total',
      data: data,
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.03)'
      },
      itemStyle: {
        color: departmentColors[department] || '#999999' // Default color if not specified
      }
    })
  })
  

  const option = {
    
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
    },
    legend: {
      data: Object.keys(departmentColors)
    },
    xAxis: {
      type: 'category',
      data: ['10 pm','11 pm','12 am','01 am','02 am','03 am','04 am','05 am','06 am','07 am','08 am','09 am','10 am','11 am','12 pm','01 pm','02 pm','03 pm','04 pm','05 pm','06 pm','07 pm','08 pm','09 pm'],
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 60,
      interval: 15
    },
    series: series,
  };
  return option;
}

function DayOfWeek({date}){
  let days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  let dayOfWeek = days[new Date(date).getDay()];
  return (
    <Typography level="h3" sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {dayOfWeek}
    </Typography>
  )
}
export default function ViewDailyReport({timeEntries,params,searchParams}){
  const router = useRouter();
  const option = generateChartOption(timeEntries);
  let departments = [...new Set(timeEntries.map(entry => entry.department))];
  const handlePrevDay = () => {
    const currentDate = new Date(params.date);
    currentDate.setDate(currentDate.getDate() - 1);
    const prevDay = currentDate.toISOString().split('T')[0];
    // Navigate to the previous day
    router.push(`/reports/day/${prevDay}`);
  };

  const handleNextDay = () => {
    const currentDate = new Date(params.date);
    currentDate.setDate(currentDate.getDate() + 1);
    const nextDay = currentDate.toISOString().split('T')[0];
    // Navigate to the next day
    router.push(`/reports/day/${nextDay}`);
  };
  let pieOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };

  return (
    <>
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={2}
        alignItems="flex-end"
        useFlexGap 
        sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        // flexWrap="wrap"
      >
        {searchParams.description && <Typography level="body"> Filtered by Description</Typography>}
        {searchParams.project && <Typography level="body"> Filtered by Project</Typography>}
        {searchParams.department && <Typography level="body"> Filtered by Department</Typography>}
        {(searchParams.description || searchParams.project || searchParams.department) && <Link href='?'>Clear</Link>}
      </Stack>
      <Typography level="h1" sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconButton onClick={handlePrevDay} sx={{ mr: 1 }}>
          <ChevronLeftIcon sx={{ fontSize: 40 }} />
        </IconButton>
        {params.date}
        <IconButton onClick={handleNextDay} sx={{ ml: 1 }}>
          <ChevronRightIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Typography>
      <DayOfWeek date={params.date}/>
      <ReactECharts option={option}/>
      <SummarizeTimeEntries timeEntries={timeEntries} searchParams={searchParams}/>
      {/* <ReactECharts option={pieOption}/> */}
      
      {/* <pre>{JSON.stringify(departments,null,2)}</pre> */}
      {/* <pre>{JSON.stringify(timeEntries,null,2)}</pre> */}
      {/* <pre>{JSON.stringify(option,null,2)}</pre> */}
    </>
  )
}
'use client';
import React,{useEffect} from 'react';
import { Card, Typography, Button, Box, Chip ,Grid} from '@mui/joy';
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from 'next/navigation';
import TextField from '@/components/FormFields/TextField';





function MaxPossibleOutput({timeRemaining,dayTotal}) {
  let statusColor='success';
  let max_possible_work=0;
  max_possible_work+=dayTotal.useful/60; // work done
  max_possible_work+=timeRemaining['  Work']?.remaining_raw; // time remaining
  let done = dayTotal.useful/60;
  let remaining = timeRemaining['  Work']?.remaining_raw;
  let buffer = timeRemaining['  Buffer']?.remaining_raw;
  if(max_possible_work<8)
    statusColor='warning';
  if(max_possible_work<6)
    statusColor='danger';
  //  ${?.toFixed(1)} hrs + ${time_remaining['  Buffer']?.remaining_raw?.toFixed(1)} hrs`);
  return (
    <Card
      sx={{
        width: 470,
        height: 305,
        // height: '90dvh',
        maxWidth: '100%',
        maxHeight: '100%',
        boxShadow: 'lg',
        p: 7,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <pre>{JSON.stringify(timeRemaining,null,2)}</pre> */}
      {/* <pre>{JSON.stringify(dayTotal,null,2)}</pre> */}
      <Typography sx={{mb:-1.5}}>
        max possible output
      </Typography>
      <Typography level='h3' color={statusColor} component='h3' sx={{ textAlign:'center',fontSize:35,fontWeight:1000}}>
        {max_possible_work?.toFixed(1)} Hrs <Typography sx={{color:'grey'}}> + {buffer.toFixed(1)} hrs</Typography>
      </Typography>
      <Typography sx={{textAlign:'center'}}>
        {done.toFixed(1)} hrs + {remaining.toFixed(1)} hrs + {buffer.toFixed(1)} hrs<br/>
        done + remaining + buffer<br/>
      </Typography>
      <Typography level='body-xs' sx={{mt:8,mb:-8}}>
        Updated at {new Date().toTimeString().substring(0,5)}
      </Typography>
      
      
      {/* <CardOverflow sx={{ bgcolor: 'background.level2' }}>
        <CardActions buttonFlex="1">
          <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
            <Button>Join the waiting list</Button>
            <Button>Connect</Button>
          </ButtonGroup>
        </CardActions>
      </CardOverflow> */}
    </Card>
  );
}
function MaxPossibleSleep({timeRemaining,dayTotal}) {
  let statusColor='success';
  let max_possible_work=0;
  max_possible_work+=dayTotal.useful/60; // work done
  max_possible_work+=timeRemaining['  Work']?.remaining_raw; // time remaining
  let done = dayTotal.useful/60;
  let remaining = timeRemaining['  Work']?.remaining_raw;
  let buffer = timeRemaining['  Buffer']?.remaining_raw;
  if(max_possible_work<8)
    statusColor='warning';
  if(max_possible_work<6)
    statusColor='danger';
  //  ${?.toFixed(1)} hrs + ${time_remaining['  Buffer']?.remaining_raw?.toFixed(1)} hrs`);
  return (
    <Card
      sx={{
        width: 470,
        height: 305,
        // height: '90dvh',
        maxWidth: '100%',
        maxHeight: '100%',
        boxShadow: 'lg',
        p: 7,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <pre>{JSON.stringify(timeRemaining,null,2)}</pre> */}
      {/* <pre>{JSON.stringify(dayTotal,null,2)}</pre> */}
      <Typography sx={{mb:-1.5}}>
        max possible sleep
      </Typography>
      <Typography level='h3' color={statusColor} component='h3' sx={{ textAlign:'center',fontSize:35,fontWeight:1000}}>
        {max_possible_work?.toFixed(1)} Hrs <Typography sx={{color:'grey'}}> + {buffer.toFixed(1)} hrs</Typography>
      </Typography>
      <Typography sx={{textAlign:'center'}}>
        {done.toFixed(1)} hrs + {remaining.toFixed(1)} hrs + {buffer.toFixed(1)} hrs<br/>
        done + remaining + buffer<br/>
      </Typography>
      <Typography level='body-xs' sx={{mt:8,mb:-8}}>
        Updated at {new Date().toTimeString().substring(0,5)}
      </Typography>
      
      
      
      {/* <CardOverflow sx={{ bgcolor: 'background.level2' }}>
        <CardActions buttonFlex="1">
          <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
            <Button>Join the waiting list</Button>
            <Button>Connect</Button>
          </ButtonGroup>
        </CardActions>
      </CardOverflow> */}
    </Card>
  );
}

function Preferences({searchParams}) {
  
  
  return (
    <Card
      sx={{
        width: 470,
        height: 405,
        // height: '90dvh',
        maxWidth: '100%',
        maxHeight: '100%',
        boxShadow: 'lg',
        p: 7,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <pre>{JSON.stringify(timeRemaining,null,2)}</pre> */}
      {/* <pre>{JSON.stringify(dayTotal,null,2)}</pre> */}
      <Typography level='h3'>
        Preferences
      </Typography>
      <form method="GET" action="/">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField 
            label='Timezone'
            name='timezone'
            type='number'
            defaultValue={searchParams.timezone || 5.5}
            endDecorator={'hrs'}
            // onBlur={onBlur}
          />
          <TextField 
            label='Start of day'
            name='start_of_day'
            type='number'
            defaultValue={searchParams.start_of_day || 4}
            endDecorator={'hrs'}
            // onBlur={onBlur}
          />
          <TextField 
            label='Target Output'
            name='target_output'
            type='number'
            defaultValue={searchParams.target_output || 8}
            endDecorator={'hrs'}
            // onBlur={onBlur}
          />
          <TextField 
            label='Target Sleep'
            name='target_sleep'
            type='number'
            defaultValue={searchParams.target_sleep || 8}
            endDecorator={'hrs'}
            // onBlur={onBlur}
          />
        
          <Button type="submit" variant="soft" color="primary" sx={{mt:1}}>
            Submit
          </Button>
        </Box>
      </form>
      
      
      
    </Card>
  );
}


// export default PricingPlans;
export default function LandingPage({timeRemaining,dayTotal,searchParams}){
  const router = useRouter();
  console.log('Landing page');
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('updated: ',new Date());
      router.refresh();
    }, 60000); // 60000 ms = 60 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [router]);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <MaxPossibleOutput timeRemaining={timeRemaining} dayTotal={dayTotal}/>
      <MaxPossibleSleep timeRemaining={timeRemaining} dayTotal={dayTotal}/>
      <Preferences searchParams={searchParams}/>
      
      
      {/* <pre>{JSON.stringify(searchParams,null,2)}</pre> */}
      {/* <pre>{JSON.stringify(timeRemaining,null,2)}</pre> */}
      {/* <pre>{JSON.stringify(dayTotal,null,2)}</pre> */}
    </Box>
  )
}
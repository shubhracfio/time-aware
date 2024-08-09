'use client';
import React,{useEffect} from 'react';
import { Card, Typography, Button, Box, Chip } from '@mui/joy';
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from 'next/navigation';





function BioCard({timeRemaining,dayTotal}) {
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
        width: 500,
        height: '90dvh',
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
      <Typography>
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



// export default PricingPlans;
export default function LandingPage({timeRemaining,dayTotal}){
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      router.refresh();
    }, 60000); // 60000 ms = 60 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [router]);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
      <BioCard timeRemaining={timeRemaining} dayTotal={dayTotal}/>
      
    </Box>
  )
}
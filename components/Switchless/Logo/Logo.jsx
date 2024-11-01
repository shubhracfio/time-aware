'use client';
import { Typography, Stack, Sheet } from "@mui/joy";
import Link from "next/link";

export default function LogoV1({ offering='Cashflowy', href='/', sx={}}) {
    const sxDefault={ display: 'inline-block',border:1, borderRadius:8 }
    
  return (
    <Sheet sx={{...sx,...sxDefault}}>
    <Link href={href} style={{textDecoration: 'none', border:'none'}}>
      <Stack  direction='row'>
        <Typography level="h3" sx={{color:'white', backgroundColor:'black', borderRadius:7, px:1}}>CF</Typography>
        {offering !== '' && <Typography level="h3" sx={{px:1}}>{offering}</Typography>}
      </Stack>
    </Link>
    </Sheet>
  )
}
import 'server-only';
import Navbar from './Navbar';
import { redirect, } from 'next/navigation'
import {auth, signOut} from '@/auth'

async function signOutFn() {
  'use server'
  await signOut();
  // console.log('this happens on the server');
  // console.log('signout');
  // const supabase = createClient();
  // await supabase.auth.signOut();
  redirect('/login')
}



export default async function SidebarSSR (){
  const session = await auth();
  return (
    <Navbar user={session?.user} signOut={signOutFn}/>  
  )
}
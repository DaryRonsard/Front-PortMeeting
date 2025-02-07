
import React from 'react'
import SideBar from '@/components/user/sidebar'
import Body from './body'
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

export default async function Dashboard() {

  const cookie:any = await cookies()
  const decode:any = cookie?.get("access_token")?.value ? jwtDecode(cookie?.get("access_token")?.value) : null
  const  username = decode?.username || null
  const  email = decode?.email || null
  const  last_name = decode?.last_name || null
  const  first_name = decode?.first_name || null
  // console.log(decode);

  return (
    <>
      <main className="min-h-screen pt-[20px] pr-5 pb-3 bg-[#f8f8f6]">
        <Body 
          username={username} 
          email={email}
          last_name={last_name}
          first_name={first_name}
        />
      </main>
    </>
  )
}

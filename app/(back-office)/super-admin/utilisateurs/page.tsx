
import React from 'react'
import Body from './body'
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

export default async function UtilisateurPage() {

  const cookie:any = await cookies()
  const decode:any = cookie?.get("access_token")?.value ? jwtDecode(cookie?.get("access_token")?.value) : null
  const  username = decode?.username || null
  const  user_role = decode?.role || null
  const  email = decode?.email || null
  const  user_profil = decode?.avatar || null
  const  last_name = decode?.last_name || null
  const  first_name = decode?.first_name || null

  return (
    <>
      <main className="min-h-screen pt-[20px] pr-5 pb-3 bg-[#f8f8f6]">
        <Body />
      </main>
    </>
  )
}

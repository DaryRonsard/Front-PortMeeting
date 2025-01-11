
import React from 'react'
import SideBar from '@/components/user/sidebar'
import Body from './body'
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

export default async function Dashboard() {
  return (
    <>
      <main className="min-h-screen pt-[20px] pr-5 pb-3 bg-[#f8f8f6]">
        <Body />
      </main>
    </>
  )
}

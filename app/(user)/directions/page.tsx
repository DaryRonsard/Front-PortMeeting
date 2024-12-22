
import React from 'react'
import SideBar from '@/components/user/sidebar'
import Body from './body'

export default async function Directions() {

  return (
    <>
      <main className="min-h-screen pt-[20px] pr-5 pb-3 bg-[#f8f8f6]">
        <SideBar/>
        <Body />
      </main>
    </>
  )
}
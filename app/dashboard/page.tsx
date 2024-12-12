
import React from 'react'
import Header from './header'
import SideBar from './sidebar'
import Body from './body'

export default async function Dashboard() {

  return (
    <>
      <main className="min-h-screen pt-[20px] pr-5 pb-3 bg-[#f8f8f6]">
        <SideBar />
        <Body />
      </main>
    </>
  )
}

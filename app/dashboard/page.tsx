
import React from 'react'
// Components
import Header from './header'
import SideBar from './sidebar'
import Body from './body'
// API
import { getUtilisateurs } from '@/utils/handlerApi'

export default async function Dashboard() {

  const utilisateurs = await getUtilisateurs()

  return (
    <>
      <main className="min-h-screen pt-[80px] pr-5 pb-3 bg-[#f8f8f6]">
        <Header />
        <SideBar />
        <Body />
      </main>
    </>
  )
}

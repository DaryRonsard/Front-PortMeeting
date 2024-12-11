
import React from 'react'
import { getUtilisateurs } from '@/utils/fetchApi'
import SideBar from './sidebar'
import Body from './body'

export default async function Dashboard() {

  const utilisateurs = await getUtilisateurs()

  return (
    <main className="min-h-screen pt-5 pb-3 bg-[#f8f8f6]">
      <SideBar />
      <Body />
    </main>
  )
}


import React from 'react'
import SideBar from '@/components/user/sidebar'
import Body from './body'

export default async function Page({params}:{params:Promise<{id?:string,id_salle?:string}>}) {

  const {id:id_direction,id_salle} = await params


  return (
    <>
      <main className="min-h-screen pt-[20px] pr-5 pb-3 bg-[#f8f8f6]">
        <SideBar />
        <Body id_direction={id_direction} id_salle={id_salle}/>
      </main>
    </>
  )
}

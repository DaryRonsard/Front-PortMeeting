
import "./style.css"
import React from 'react'
import Body from './body'

export default async function Page({params}:{params:Promise<{id?:string,id_salle?:string}>}) {

  const {id:id_direction,id_salle} = await params

  return (
    <>
      <main className="min-h-screen pt-[20px] pr-5 pb-3 bg-[#f8f8f6]">
        <Body id_direction={id_direction} id_salle={id_salle}/>
      </main>
    </>
  )
}

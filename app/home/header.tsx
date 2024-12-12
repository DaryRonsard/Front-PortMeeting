"use client"

import React from 'react'
import { useRouter } from 'next/navigation'


export default function Header() {

  const router = useRouter()

  return (
    <header className="w-full flex flex-col gap-y-3 sm:flex-row items-center justify-between backdrop-blur-sm fixed z-50 top-0 left-0 right-0 py-2 px-6 border-b-[1.6px] border-gray-200 bg-[#ddeef566]">

      <div className="flex items-center gap-x-2">
        <img src='/images/meeting-logo-1.png' width={60}/>
        <h3 className="font-medium text-2xl text-blue-500 uppercase select-none"
          style={{textShadow:"0px 0px 2px blue"}}
        >
          Metting
        </h3>
      </div>

      <div className="flex items-center gap-x-3">
        <button type="button" 
          onClick={() => router.push("/login")}
          className="py-[10px] px-5 rounded-[8px] text-white hover:text-white bg-blue-500 hover:bg-blue-600 hover:active:bg-blue-700 shadow-md select-none" 
        >
          Se connecter
        </button>
        
        <button type="button"  
          className="py-[10px] px-5 rounded-[8px] text-white hover:text-white bg-green-500 hover:bg-green-600 shadow-md select-none" 
        >
          Créer un compte
        </button>
      </div>

    </header>
  )
}


"use client"

import React from 'react'

export default function SideBar() {
  return (
    <aside className="fixed top-0 lef-0 h-full w-full max-w-[270px]">

        <div className="bg-[#ffffff] rounded-sm border-[0.2px] border-gray-200 h-full py-3">

            <div className="flex items-center gap-x-3 mb-2 px-3">
                <img src="/images/meeting-logo-1.png" alt="logo" width={60} className=""/>
                <h3 className="font-medium text-2xl text-blue-500 uppercase"
                style={{textShadow:"0px 0px 2px blue"}}
                >
                Metting
                </h3>
            </div>

            <ul className="list-none py-3 px-2">
                <li className="my-1">
                    <a href="" className="bg-[#ebf5fa] flex items-center gap-x-2 p-2 text-center rounded-lg text-blue-700 font-medium">
                        <i className="fa-solid fa-gauge text-[17px] bg-blue-500 text-white p-[6px] rounded-full"></i>
                        Tableau de bord
                    </a>
                </li>
                <li className="my-1">
                    <a href="" className="flex items-center gap-x-2 p-2 text-center rounded-lg">

                        <i className="fa-solid fa-door-open text-[20px]  text-gray-500 p-[6px] rounded-full"></i>
                        Salles de réunion
                    </a>
                </li>
               
                
            </ul>
            
        </div>

    </aside>
  )
}


"use client"

import { logout } from '@/utils/handlerApi'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function SideBar() {

    const router = useRouter()

    const onLogout = async () => {
        const response = await logout()
        if(response.success) router.push("/home")
    }

  return (

    <aside className="fixed z-20 top-0 left-0 h-full w-full max-w-[270px]">

        <div className="h-full flex flex-col bg-[#ffffff] rounded-sm border-r-[0.2px] border-gray-200 py-3">

            <div className="flex items-center gap-x-3 mb-2 px-3 pb-2 ">
                <img src="/images/meeting-logo-1.png" alt="logo" width={60} className=""/>
                <h3 className="font-medium text-2xl text-blue-500 uppercase"
                style={{textShadow:"0px 0px 2px blue"}}
                >
                    Meetting
                </h3>
            </div>

            <div className="h-full flex flex-col justify-between">
                <div className="h-full">
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
                <div className="px-2">
                    <button className="w-full flex items-center gap-x-2 px-1 py-1  hover:bg-gray-200 rounded-[5px]">
                        <div className="relative rounded-full w-[40px] h-[40px]">
                            <img 
                                src="/images/sofware-enginer.jpg" alt="avatar" 
                                className="w-full h-full rounded-full border-2 border-blue-300 cursor-pointer"
                                id="user-profil"
                            />
                        </div>
                        <span>Hien Dary</span>
                    </button>
                    <div className="mt-3 mb-1">
                        <button onClick={onLogout}  className="group flex items-center gap-x-2 w-full text-left font-medium text-red-500 py-[10px] px-3 rounded-[5px] bg-red-500 hover:bg-[#e03f3f] hover:active:bg-red-500  hover:text-white">
                            <i className="group-hover:text-white fa-solid fa-right-from-bracket text-white"></i>
                            <span className="text-white">Se déconnecter</span>
                        </button>
                    </div>
                </div>
            </div>
            
        </div>

    </aside>

  )

}


"use client"

import { logout } from '@/utils/handlerApi'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { destroyCookie } from 'nookies'
import React from 'react'


type sideBarType = {
    location?:string
}


export default function SideBar(props:sideBarType) {
        
    const router = useRouter()
    
    const pathname = usePathname()

    const onLogout = async () => {
        destroyCookie(null,"access_token")
        destroyCookie(null,"refresh_token")
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        return router.push("/home")
    }



  return (

    <aside className={`fixed z-20 top-0 left-0 h-full w-full max-w-[270px]`}>

        <div className="h-full flex flex-col bg-[#ffffff] rounded-sm border-r-[0.2px] border-gray-200 py-3">

            <div className="flex items-center gap-x-3 mb-2 px-3 pb-2 ">
                <img src="/images/meeting-logo-1.png" alt="logo" width={60} className=""/>
                <h3 className="font-medium text-2xl text-blue-500 uppercase"
                style={{textShadow:"0px 0px 2px blue"}}
                >
                    Meeting
                </h3>
            </div>

            <div className="h-full flex flex-col justify-between">
                <div className="h-full">
                    <ul className="list-none py-3 px-2">
                        <li className="my-1">
                            <Link href="/dashboard" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/dashboard") ? "bg-[#ebf5fa] text-blue-500 font-medium " : ""} `}>
                                <i className={`fa-solid fa-gauge text-[17px] p-[6px] rounded-full ${pathname.startsWith("/dashboard") ? " bg-blue-500 text-white " : "text-white bg-blue-500" }`}></i>
                                Tableau de bord
                            </Link>
                        </li>
                        <li className="my-1">
                            <Link href="/directions" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/directions") ? "bg-[#ebf5fa] text-blue-500 font-medium " : ""}`}>
                                <i className={`fa-solid fa-door-open text-[15.3px]  p-[6px] rounded-full ${pathname.startsWith("/directions") ? " bg-blue-500 text-white " : "text-white bg-blue-500" }`}></i>
                                Directions
                            </Link>
                        </li>
                        <li className="my-1">
                            <Link href="/reservations" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/reservations") ? "bg-[#ebf5fa] text-blue-500 font-medium " : ""}`}>
        
                                <i className={`fa-solid fa-door-open text-[15.3px]  p-[6px] rounded-full ${pathname.startsWith("/reservations") ? " bg-blue-500 text-white " : "text-white bg-blue-500" }`}></i>
                                Réservations
                            </Link>
                        </li>
                        <li className="my-1">
                            <Link href="/chat" className="flex items-center gap-x-2 p-2 text-center rounded-lg">
        
                                <i className="fa-solid fa-door-open text-[20px]  text-gray-500 p-[6px] rounded-full"></i>
                                Chat
                            </Link>
                        </li>
                        <li className="my-1">
                            <Link href="/video" className="flex items-center gap-x-2 p-2 text-center rounded-lg">
                                <i className="fa-solid fa-door-open text-[20px]  text-gray-500 p-[6px] rounded-full"></i>
                                Vidéo conférence
                            </Link>
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

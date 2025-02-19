
"use client"

import { logout } from '@/utils/handlerApi'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { destroyCookie } from 'nookies'
import React from 'react'


type sideBarType = {
    location?:string,
    user_role?:string
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

        <div className="h-full flex flex-col bg-[#11538c] border-r-[0.2px] border-gray-200 py-3">

            <div className="flex items-center gap-x-2 mb-2 px-3 pb-2 ">
                <img src="/images/meeting-logo-1.png" alt="logo" width={50}/>
                <h3 className="font-medium text-xl text-blue-500 uppercase text-white"style={{textShadow:"0px 0px 2px blue"}}>Meeting GEST</h3>
            </div>

            <div className="h-full flex flex-col justify-between">
                <div className="h-full">
                    <ul className="list-none py-3 px-2">
                        <li className="my-1">
                            <Link href="/admin/dashboard" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/admin/dashboard") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-white"} `}>
                                <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full ${pathname.startsWith("/admin/salles") ? " bg-[#dfbd08e8] text-white " : "text-white bg-[#dfbd08e8]" }`}>
                                    <i className={`fa-solid fa-gauge`}></i>
                                </span>
                                {/* <i className={`fa-solid fa-gauge text-[16px] py-[7px] px-[7px] rounded-full ${pathname.startsWith("/admin/dashboard") ? " bg-[#dfbd08e8] text-white " : "text-white bg-[#dfbd08e8]" }`}></i> */}
                                Tableau de bord
                            </Link>
                        </li>
                        <li className="my-1">
                            <Link href="/admin/salles" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/admin/salles") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-white"}`}>
                                <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full ${pathname.startsWith("/admin/salles") ? " bg-[#f4991b] text-white " : "text-white bg-[#f4991b]" }`}>
                                    <i className={`fa-solid fa-door-open`}></i>
                                </span>
                                {/* <i className={`fa-solid fa-door-open text-[15.3px] py-[7px] px-[6px] rounded-full ${pathname.startsWith("/admin/salles") ? " bg-[#f4991b] text-white " : "text-white bg-[#f4991b]" }`}></i> */}
                                Salles
                            </Link>
                        </li>
                        <li className="my-1">
                            <Link href="/admin/equipements" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/admin/equipements") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-white"}`}>
                                <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full ${pathname.startsWith("/admin/equipements") ? " bg-[#14a4e8] text-white " : "text-white bg-[#14a4e8]" }`}>
                                    <i className={`fa-solid fa-toolbox`}></i>
                                </span>
                                {/* <i className={`fa-solid fa-toolbox text-[15.3px] py-[7px] px-[7px] rounded-full ${pathname.startsWith("/admin/equipements") ? " bg-[#f4991b] text-white " : "text-white bg-[#f4991b]" }`}></i> */}
                                Equipements
                            </Link>
                        </li>
                        <li className="my-1">
                            <Link href="/admin/reservations" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/admin/reservations") ? "bg-[#ebf5fa] text-blue-500 font-medium" : "text-white"}`}>
                                <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full ${pathname.startsWith("/admin/salles") ? " bg-[#74c042] text-white " : "text-white bg-[#74c042]" }`}>
                                    <i className={`fa-solid fa-calendar-days`}></i>
                                </span>
                                {/* <i className={`fa-solid fa-calendar-days text-[15.5px] py-[7px] px-[8px] rounded-full ${pathname.startsWith("/admin/reservations") ? " bg-[#74c042] text-white " : "text-white bg-[#74c042]" }`}></i> */}
                                Réservations
                            </Link> 
                        </li>
                        <li className="my-1">
                            <Link href="/admin/chat" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/admin/chat") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-white"}`}>
                                <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full ${pathname.startsWith("/admin/salles") ? " bg-[#3182c7] text-white " : "text-white bg-[#3182c7]" }`}>
                                    <i className={`fa-solid fa-message`}></i>
                                </span>
                                {/* <i className={`fa-solid fa-message text-[15.3px]  text-gray-500 py-[7px] px-[7px] rounded-full ${pathname.startsWith("/admin/chat") ? " bg-[#3182c7] text-white " : "text-white bg-[#3182c7] pt-2" }`}></i> */}
                                Chat
                                <span 
                                    style={{fontSize:"14px"}}
                                    className="absolute right-[15px] bg-[#ff0000] rounded-[20px] py-[1.5px] px-[8px] text-white font-medium"
                                >
                                    2
                                </span>
                            </Link>
                        </li>
                        <li className="my-1">
                            <Link href="/admin/video" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/admin/video") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-white"}`}>
                                <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full ${pathname.startsWith("/admin/salles") ? " bg-[#c81f27] text-white " : "text-white bg-[#c81f27]" }`}>
                                    <i className={`fa-solid fa-video `}></i>
                                </span>
                                {/* <i className={`fa-solid fa-video text-[15.3px] text-gray-500 py-[7px] px-[6px] rounded-full ${pathname.startsWith("/admin/video") ? " bg-[#c81f27] text-white " : "text-white bg-[#c81f27]" }`}></i> */}
                                Vidéo conférence
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="border-t-[1.55px] flex items-center justify-between gap-3 px-2">
                    <button className="w-full py-1 cursor-default">
                        <div className="flex items-center">
                            <div className="relative rounded-full w-[37px] h-[37px] mr-2">
                                <img 
                                    src="/images/sofware-enginer.jpg" alt="avatar" 
                                    className="w-full h-full rounded-full border-2 border-blue-300 cursor-pointer "
                                    id="user-profil"
                                />
                            </div>
                            <div className="w-full max-w-[150px] text-center">
                                <p className="overflow-hidden text-ellipsis text-nowrap text-white">Hien Dary</p>
                                <span className="overflow-hidden text-ellipsis text-sm text-white">hiendary@gmail.com</span>
                            </div>
                        </div>
                    </button>
                    <button 
                        onClick={onLogout}
                        className="group flex items-center justify-center py-[5px] px-3 rounded-[3px] "
                    >
                        <i className="group-hover:text-gray-300 fa-solid fa-right-from-bracket text-white text-lg">
                        </i> 
                    </button>
                </div>
            </div>
            
        </div>

    </aside>

  )

}

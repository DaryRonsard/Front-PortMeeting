"use client"

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import React from 'react';
import {sideBarType} from '@/utils/type';


const LeftSideBar = (props:sideBarType) => {

    const pathname = usePathname()
    const router = useRouter()

    const onLogout = async () => {
        destroyCookie(null, "access_token",{path:"/"})
        destroyCookie(null, "refresh_token",{path:"/"})
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        router.replace("/home")
    }

    switch (props?.user_role) {

        case "secretaire":
            return (
                <aside className={`fixed z-20 top-0 left-0 h-full w-full max-w-[270px]`}>

                    <div className="h-full flex flex-col bg-[#11538c] border-r-[0.2px] border-gray-200 py-3">

                        <Link href={"/admin/dashboard"} className="flex items-center gap-x-2 mb-2 px-3 pb-2 ">
                            <img src="/images/meeting-logo-1.png" alt="logo" width={50} />
                            <h3 className="font-medium text-xl text-blue-500 uppercase text-white" style={{ textShadow: "0px 0px 2px blue" }}>Meeting GEST</h3>
                        </Link>

                        <div className="h-full flex flex-col justify-between">

                            <div className="h-full">
                                <ul className="list-none py-3 px-2">
                                    <li className="my-1">
                                        <Link href="/admin/dashboard" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/admin/dashboard") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-white"} `}> 
                                            <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[#dfbd08e8]`}>
                                                <i className={`fa-solid fa-gauge text-white`}></i>
                                            </span>
                                            Tableau de bord
                                        </Link>
                                    </li>
                                    <li className="my-1">
                                        <Link href="/admin/salles" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/admin/salles") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-white"}`}>
                                            <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[#f4991b]`}>
                                                <i className={`fa-solid fa-door-open text-white`}></i>
                                            </span>
                                            Salles
                                        </Link>
                                    </li>
                                    <li className="my-1">
                                        <Link href="/admin/equipements" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/admin/equipements") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-white"}`}>
                                            <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[#14a4e8]`}>
                                                <i className={`fa-solid fa-toolbox text-white`}></i>
                                            </span>
                                            Equipements
                                        </Link>
                                    </li>
                                    <li className="my-1">
                                        <Link href="/admin/reservations" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/admin/reservations") ? "bg-[#ebf5fa] text-blue-500 font-medium" : "text-white"}`}>
                                            <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[#74c042]`}>
                                                <i className={`fa-solid fa-calendar-days text-white`}></i>
                                            </span>
                                            Réservations
                                        </Link>
                                    </li>
                                    <li className="my-1">
                                        <Link href="/admin/chat" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/admin/chat") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-white"}`}>
                                            <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[#3182c7]`}>
                                                <i className={`fa-solid fa-message text-white`}></i>
                                            </span>
                                            Chat
                                            {/* <span
                                                style={{ fontSize: "14px" }}
                                                className="absolute right-[15px] bg-[#ff0000] rounded-[20px] py-[1.5px] px-[8px] text-white font-medium"
                                            >
                                                2
                                            </span> */}
                                        </Link>
                                    </li>
                                    {/* <li className="my-1">
                                        <Link href="/admin/video" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/admin/video") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-white"}`}>
                                            <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[#c81f27]`}>
                                                <i className={`fa-solid fa-video text-white`}></i>
                                            </span>
                                            Vidéo conférence
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>

                            <div className="border-t-[1.55px] flex items-center justify-between gap-3 px-2">
                                <button className="w-full py-1 cursor-default">
                                    <div className="flex items-center">
                                        <div className="relative rounded-full w-[37px] h-[37px] mr-2">
                                            <img
                                                src={`${props?.user_profil || "/images/sofware-enginer.jpg"}`} alt="avatar"
                                                className="w-full h-full rounded-full border-2 border-blue-300 cursor-pointer "
                                                id="user-profil"
                                            />
                                        </div>
                                        <div className="w-full max-w-[150px] text-center">
                                            <p className="overflow-hidden text-ellipsis text-nowrap text-white">
                                                {props?.first_name || "Coulibaly"} {props?.last_name || "Aminata"}
                                            </p>
                                            <span className="overflow-hidden text-ellipsis text-sm text-white">{props?.email || "hiendary@gmail.com"}</span>
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
        break;

        case "super_admin":
            return (
                <aside className={`fixed z-20 top-0 left-0 h-full w-full max-w-[270px]`}>

                    <div className="h-full flex flex-col bg-[#d62727] border-r-[0.2px] border-gray-200 py-3">

                        <Link href={"/super-admin/dashboard"} className="flex items-center gap-x-2 mb-2 px-3 pb-2 ">
                            <img src="/images/meeting-logo-1.png" alt="logo" width={50} />
                            <h3 className="font-medium text-xl text-blue-500 uppercase text-white" style={{ textShadow: "0px 0px 2px blue" }}>Meeting ADMIN</h3>
                        </Link>

                        <div className="h-full flex flex-col justify-between">
                            <div className="h-full">
                                <ul className="list-none py-3 px-2">
                                    <li className="my-1">
                                        <Link href="/super-admin/dashboard" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/super-admin/dashboard") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-white"} `}>
                                            <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[#dfbd08e8]`}>
                                                <i className={`fa-solid fa-gauge text-white`}></i>
                                            </span>
                                            Tableau de bord
                                        </Link>
                                    </li>
                                    <li className="my-1">
                                        <Link href="/super-admin/utilisateurs" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/super-admin/utilisateurs") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-white"}`}>
                                            <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[#f4991b]`}>
                                                <i className={`fa-solid fa-user text-white`}></i>
                                            </span>
                                            Utilisateurs
                                        </Link>
                                    </li>
                                    <li className="my-1">
                                        <Link href="/super-admin/directions" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/super-admin/directions") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-white"}`}>
                                            <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[#f4991b]`}>
                                                <i className={`fa-solid fa-door-open text-white`}></i>
                                            </span>
                                            Directions
                                        </Link>
                                    </li>
                                    <li className="my-1">
                                        <Link href="/super-admin/salles" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/super-admin/salles") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-white"}`}>
                                            <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[#f4991b]`}>
                                                <i className={`fa-solid fa-door-open text-white`}></i>
                                            </span>
                                            Salles
                                        </Link>
                                    </li>
                                    <li className="my-1">
                                        <Link href="/super-admin/equipements" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/super-admin/equipements") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-white"}`}>
                                            <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[#14a4e8]`}>
                                                <i className={`fa-solid fa-toolbox text-white`}></i>
                                            </span>
                                            Equipements
                                        </Link>
                                    </li>
                                    <li className="my-1">
                                        <Link href="/super-admin/reservations" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/super-admin/reservations") ? "bg-[#ebf5fa] text-blue-500 font-medium" : "text-white"}`}>
                                            <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[#74c042]`}>
                                                <i className={`fa-solid fa-calendar-days text-white`}></i>
                                            </span>
                                            Réservations
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="border-t-[1.55px] flex items-center justify-between gap-3 px-2">
                                <button className="w-full py-1 cursor-default">
                                    <div className="flex items-center">
                                        <div className="relative rounded-full w-[37px] h-[37px] mr-2">
                                            <img
                                                src={`${props?.user_profil || "/images/sofware-enginer.jpg"}`} alt="avatar"
                                                className="w-full h-full rounded-full border-2 border-blue-300 cursor-pointer "
                                                id="user-profil"
                                            />
                                        </div>
                                        <div className="w-full max-w-[150px] text-center">
                                            <p className="overflow-hidden text-ellipsis text-nowrap text-white">
                                                {props?.first_name || "Hien"} {props?.last_name || "Dary"}
                                            </p>
                                            <span className="overflow-hidden text-ellipsis text-sm text-white">
                                                {props?.email || "hiendary@gmail.com"}
                                            </span>
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
        break;

        case "employe":
            return (
                <aside className={`fixed z-20 top-0 left-0 h-full w-full max-w-[270px]`}>

                    <div className="h-full flex flex-col bg-[#ffffff] border-r-[0.2px] border-gray-200 py-3">

                        <Link href={"/user/dashboard"} className="flex items-center gap-x-2 mb-2 px-3 pb-2 ">
                            <img src="/images/meeting-logo-1.png" alt="logo" width={50} />
                            <h3 className="font-medium text-xl text-blue-500 uppercase" style={{ textShadow: "0px 0px 2px blue" }}>Meeting</h3>
                        </Link>

                        <div className="h-full flex flex-col justify-between">
                            <div className="h-full">
                                <ul className="list-none py-3 px-2">
                                    <li className="my-1">
                                        <Link href="/user/dashboard" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/user/dashboard") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-gray-800"} `}>
                                            <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[#dfbd08e8]`}>
                                                <i className={`fa-solid fa-gauge text-white`}></i>
                                            </span>
                                            Tableau de bord
                                        </Link>
                                    </li>
                                    <li className="my-1">
                                        <Link href="/user/directions" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/user/directions") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-gray-800"}`}>
                                            <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[#f4991b]`}>
                                                <i className={`fa-solid fa-door-open text-white`}></i>
                                            </span>
                                            Directions
                                        </Link>
                                    </li>
                                    <li className="my-1">
                                        <Link href="/user/reservations" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/user/reservations") ? "bg-[#ebf5fa] text-blue-500 font-medium" : "text-gray-800"}`}>
                                            <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[#74c042]`}>
                                                <i className={`fa-solid fa-calendar-days text-white`}></i>
                                            </span>
                                            Réservations
                                        </Link>
                                    </li>
                                    <li className="my-1">
                                        <Link href="/user/chat" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/user/chat") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-gray-800"}`}>
                                            <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[#3182c7]`}>
                                                <i className={`fa-solid fa-message text-white`}></i>
                                            </span>
                                            Chat
                                            {/* <span
                                                style={{ fontSize: "14px" }}
                                                className="absolute right-[15px] bg-[#ff0000] rounded-[20px] py-[1.5px] px-[8px] text-white font-medium"
                                            >
                                                2
                                            </span> */}
                                        </Link>
                                    </li>
                                    {/* <li className="my-1">
                                        <Link href="/user/video" className={`flex items-center gap-x-2 p-2 text-center rounded-lg ${pathname.startsWith("/user/video") ? "bg-[#ebf5fa] text-blue-500 font-medium " : "text-gray-800"}`}>
                                            <span className={`h-[30px] w-[30px] flex items-center justify-center rounded-full bg-[#c81f27]`}>
                                                <i className={`fa-solid fa-video py-[7px] px-[6px] rounded-full text-white`}></i>
                                            </span>
                                            Vidéo conférence
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>

                            <div className="border-t-[1.55px] flex items-center justify-between gap-3 px-2">
                                <button className="w-full py-1">
                                    <div className="flex items-center">
                                        <div className="relative rounded-full w-[37px] h-[37px] mr-2">
                                            <img
                                                src={`${props?.user_profil || "/images/sofware-enginer.jpg"}`} alt="avatar"
                                                className="w-full h-full rounded-full border-2 border-blue-300 cursor-pointer"
                                                id="user-profil"
                                            />
                                        </div>
                                        <div className="w-full max-w-[150px] text-center">
                                            <p className="overflow-hidden text-ellipsis text-nowrap text-gray-800">{props?.first_name || "Abibu"} {props?.last_name || "Ali"}</p>
                                            <span className="overflow-hidden text-ellipsis text-sm text-gray-600">{props?.email || "hiendary@gmail.com"}</span>
                                        </div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => onLogout()}
                                    className="group flex items-center justify-center py-[5px] px-3 rounded-[3px] "
                                >
                                    <i className="group-hover:text-[#d23b3b] fa-solid fa-right-from-bracket text-[#eb0d0dc2] text-lg">
                                    </i>
                                </button>
                            </div>
                        </div>

                    </div>

                </aside>
            )
        break;
    }


}

export default LeftSideBar;

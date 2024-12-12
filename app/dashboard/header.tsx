"use client"

import { logout } from '@/utils/handlerApi'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Header() {

    const router = useRouter()

    const [mode,setMode] = useState<boolean>(false)


    // Déconnexion
    const onLogout = async () => {
        const response = await logout()
        if(response.success) return router.push("/home")
    }

    // Gestion de l'affichage du modal  
    const handleEvent = async () => {

        const userProfil = document.getElementById("user-profil")
        
        if(userProfil)
        {
            window.addEventListener("click",(e:MouseEvent) => {

                const modal:HTMLElement|null = document.querySelector("div.profil-modal-wrapper")

                if(modal)
                {
                    e.target == userProfil ? modal.style.display = "block" : modal.style.display = "none"
                }

            })
        }
    }

    useEffect(() => {
        handleEvent()        
    },[]);


    return (
        <header className="fixed bg-white z-10 top-0 left-0 right-0 w-full flex justify-between items-center px-8 py-2">
            <div></div>
            <div className="main-wrapper flex items-center gap-x-2">
                <div className="relative rounded-full w-[45px] h-[45px]" >
                    <img 
                        src="/images/sofware-enginer.jpg" alt="avatar" 
                        className="w-full h-full rounded-full border-2 border-blue-300 cursor-pointer"
                        id="user-profil"
                    />
                    <div 
                        className={`hidden profil-modal-wrapper absolute top-[55px] left-[-80px] rounded-[5px] bg-[#fffffe] w-[170px] border-[1.5px] border-gray-200`}
                    >
                        <ul className="list-none">
                            <li className="">
                                <a href="" className="group flex items-center gap-x-2 hover:bg-blue-500 hover:text-white py-[7px] px-3 rounded-sm">
                                    <i className="group-hover:text-white fa-solid fa-user text-blue-500"></i>
                                    <span>Mon profil</span>
                                </a>
                            </li>
                            <li>
                                <button onClick={onLogout}  className="group flex items-center gap-x-2 w-full text-left font-medium text-red-500 py-[7px] px-3 rounded-sm hover:bg-red-500 hover:text-white">
                                    <i className="group-hover:text-white fa-solid fa-right-from-bracket text-red-500"></i>
                                    <span>Se déconnecter</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <span className="select-none">Hien Dary</span>
                <div className="w-[25px] flex justify-center items-center">
                    <button onClick={() => setMode(!mode)}>
                        <i className={`${!mode ? "fa-solid fa-moon" : "fa-solid fa-sun text-[#007bff]"} text-xl mt-1`}></i>
                    </button>
                </div>
            </div>
        </header>
    )
}

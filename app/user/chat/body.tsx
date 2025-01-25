"use client"

import "@/styles/chat.css" 
import apiClient from '@/utils/api-client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { dashboardProps } from '@/utils/type'


export default function Body(props:dashboardProps) {

    const router = useRouter()

    useEffect(()=>{
       
    },[])

    return (
        <section className="flex pl-[270px] h-screen">

            <div className="left-wrapper flex flex-col w-full max-w-[330px] bg-white h-full border-[2px] border-r-blue-500 ">

                <div className="user-list-wrapper px-1 flex flex-col pt-1 overflow-y-hidden">

                    <div className="relative search-bar-container w-full my-1 px-2">
                        <button
                            className="absolute top-[6px] left-4"
                        >
                            <i className="fa-solid fa-magnifying-glass text-blue-500"></i>
                        </button>
                        <input 
                            type="text" 
                            placeholder="Recherche"
                            className="border-[2px] border-gray-300 outline-none rounded-[3px] w-full pl-7 pr-2 py-1 focus:border-blue-400"
                        />
                    </div>

                    <div className="px-2 mt-2 mb-1">
                        <h3 className="font-medium text-lg text-gray-600">Liste des sécretaires</h3>
                    </div>

                    <div className="user-list-container pt-1 overflow-y-scroll">

                        {Array.from([1,2,3]).map((_,index:number) => (

                            <div 
                                key={index}
                                className="user-container flex items-center gap-2 border-b-[1.3px] pb-1 my-1 hover:bg-gray-200 p-1 rounded-[3px] cursor-pointer"
                            >
                                <div 
                                    className="image-container h-[40px] w-[40px] overflow-hidden"
                                >
                                    <img src="/images/sofware-enginer.jpg" alt="user-image" 
                                        className="rounded-full border"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-sm text-blue-500">
                                            {index == 0 ?
                                                "Direction (DSIN)"
                                            : index == 1 ? 
                                                "Direction (DL)"
                                            : index == 2 ? 
                                                "Direction (DG)"
                                            :
                                                "Direction (DOMSE)"
                                            }
                                        </h3>
                                        {/* <span className="block text-end text-gray-400 text-sm">Aujourd'hui</span> */}
                                        {/* <span className="block text-end text-gray-400 text-sm">à l'instant</span> */}
                                        <span className="block text-end text-gray-400 text-sm">il y a 5 minutes</span>
                                    </div>
                                    <h3 className="font-medium text-sm text-blue-500">
                                        {index == 0 ?
                                            "Coulibaly Aminata"
                                        : index == 1 ? 
                                            "Diaby Fanta"
                                        : index == 2 ? 
                                            "Ayepo Christelle "
                                        :
                                            "Brou Ornella"
                                        }
                                    </h3>
                                    <span className="text-sm">Nouveau message reçu</span>
                                </div>
                            </div>

                        ))}


                    </div>

                </div>

            </div> 

            <div className="right-wrapper w-full bg-white ">
                    
                <div className="chat-wrapper flex flex-col justify-between h-full">

                    <div className="top-profil-wrapper p-2 flex items-center justify-between px-3 border-b-1">

                        <div className="top-profil-container flex items-center gap-2">
                            <div className="user-image-container h-[40px] w-[40px] overflow-hidden">
                                <img src="/images/sofware-enginer.jpg" alt="user-image" 
                                    className="rounded-full border"
                                />
                            </div>
                            <div className="username-fullname">
                                <h3 className="font-medium text-blue-500">
                                    Coulibaly Aminata
                                </h3>
                                <span className="text-gray-400 text-sm">En ligne il y a 2 minutes</span>
                            </div>
                        </div>

                        <div className="top-right-profil-container flex items-center gap-5">
                            <button>
                                <i className="fa-solid fa-phone text-blue-500"></i>
                            </button>
                            <button>
                                <i className="fa-solid fa-video text-blue-500"></i>
                            </button>
                            <button>
                                <i className="fa-solid fa-ellipsis-vertical text-blue-500"></i>
                            </button>
                        </div>

                    </div>

                    <div className="message-box-wrapper flex flex-col justify-end h-full overflow-hidden pb-2">

                        <div className="chat-message overflow-y-scroll overscroll-contain pl-3 pr-4">

                            {Array.from([1].map((_:any,index:number) => (
                                <div key={index}>

                                    <div className="left-message-wrapper mr-auto w-full my-2 max-w-[300px]">
                                        <div className="left-message rounded-[8px] bg-gray-300 w-full py-2 px-2 mb-1">
                                            <span className="text-black text-sm">Bonjour comment allez-vous ?</span>
                                        </div>
                                        <span className="text-gray-300 text-sm">à l'instant</span>
                                    </div>

                                    <div className="right-message-wrapper ml-auto w-full my-2 max-w-[300px]">
                                        <div className="left-message rounded-[8px] bg-green-500 w-full py-2 px-2 mb-1">
                                            <span className="block text-white  text-sm">Je vais très bien merci et vous ?</span>
                                        </div>
                                        <span className="text-gray-300 text-sm float-end">à l'instant</span>
                                    </div>

                                    
                                    <div className="left-message-wrapper mr-auto w-full my-2 max-w-[400px]">
                                        <div className="left-message rounded-[8px] bg-gray-300 w-full py-2 px-2 mb-1">
                                            <span className="text-black text-sm">Je vais également bien. Je me permet de vous contacter afin de vous informer que ma réservation pour la salle de réunion (Nouvelle Direction 5 ième étage) n'a apparement pas été prise en compte, puis-je savoir pourquoi ?</span>
                                        </div>
                                        <span className="text-gray-300 text-sm">à l'instant</span>
                                    </div>
                                    
                                </div>
                            )))}

                        </div>

                        <div className="input-container flex items-center px-2 pt-1 mr-2">
                            <div className="relative w-full">
                                <input 
                                    type="text" 
                                    placeholder="Ecrire un message"
                                    className="border border-[1.5px] shadow-md py-[9px] pl-3 pr-[55px] rounded-[10px] outline-none w-full focus:border-blue-600"
                                />
                                <button className="absolute top-[7px] right-4 bg-blue-500 active:bg-blue-600 rounded-full w-[30px] h-[30px] flex items-center justify-center">
                                    <i className="fa-solid fa-arrow-right text-md text-white"></i>
                                </button> 
                            </div>
                            <div className="flex gap-4 justify-center items-center w-full max-w-[110px]">
                                <button>
                                    <i className="fa-solid fa-face-smile text-xl text-blue-500"></i>
                                </button>
                                <button>
                                    <i className="fa-solid fa-file text-xl text-red-500"></i>
                                </button>
                                <button>
                                    <i className="fa-solid fa-camera text-xl text-gray-500"></i>
                                </button>
                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>

        </section>
    )
}

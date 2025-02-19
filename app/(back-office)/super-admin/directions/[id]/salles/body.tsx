"use client"

import { directionsList} from '@/utils/directions-infos'
import {RoomsByDirectionList } from '@/utils/room-infos'
import { RoomTools } from '@/utils/room-infos'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'


export default function Body() {

    const router = useRouter()

    const {id} = useParams()


    return (
        <section className="pl-[300px]">
            <div className="p-1 px-1 mb-5">
                <h3 className="font-medium text-xl text-blue-500 flex items-center gap-x-3"> 
                    <button onClick={() => history.back()}>
                        <i className="fa-solid fa-arrow-left text-blue-500"></i> 
                    </button>
                    Salles de réunion ({directionsList.find((item:any) => item.id == id)?.name})
                </h3>
            </div>
            <div className="grid-wrapper grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-2 gap-x-4 mt-4">

                {RoomsByDirectionList && RoomsByDirectionList.length > 0 &&

                    RoomsByDirectionList.filter((item:any) => item.id_direction == id).map((item:any,index:number) => (

                        <div
                            key={index} 
                            className="grid-item flex flex-col justify-between p-3 bg-white rounded-md shadow-md"
                        >
                            <div className="relative img-container h-[175px] rounded-md overflow-hidden  group">
                                <img src={item.images[0].name} alt="software-img" className="h-full rounded-md w-full group-hover:scale-[1.1] transition-all duration-[0.5s]"/>
                            </div>
                            <div className="my-1 w-full flex flex-col justify-between gap-y-3">
                                <div className="relative">
                                    <h3 className="text-blue-500 font-medium overflow-hidden text-nowrap text-ellipsis">
                                        {item.description}
                                    </h3>
                                    <div className="my-2">
                                        <div className="flex items-center gap-x-2 my-1">
                                            <i className="fa-solid fa-users text-blue-500"></i>
                                            <span className="text-blue-600">7 Participants</span>
                                        </div>
                                        <div className="flex items-center gap-x-2 my-1">
                                            {RoomTools && RoomTools.length > 0 && 
                                                RoomTools.map((item:any,index:number) => (
                                                    item.nom == "Projecteur" ? 
                                                        <i className="fa-solid fa-video text-red-500" key={index}></i>
                                                    :
                                                    item.nom == "Ecran" ? 
                                                        <i className="fa-solid fa-tv text-green-500" key={index}></i>
                                                    :
                                                    item.nom == "Tablette" ? 
                                                        <i className="fa-solid fa-mobile-screen text-blue-500" key={index}></i>
                                                    :
                                                    item.nom == "Micro" &&
                                                        <i className="fa-solid fa-microphone text-gray-500" key={index}></i>
                                                    
                                                ))
                                            }
                                            
                                        </div>
                                        {/* <div className="flex items-center gap-x-2 my-1">
                                            <i className="fa-solid fa-tv text-green-500"></i>
                                            <span className="text-gray-600">Écran</span>
                                        </div>
                                        <div className="flex items-center gap-x-2 my-1">
                                            <i className="fa-solid fa-mobile-screen text-blue-500"></i>
                                            <span className="text-gray-600">Tablette</span>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <button 
                                        onClick={() => router.push(`/directions/${id}/salles/${item.id_room}`)}  
                                        className="bg-blue-500 hover:bg-blue-600 hover:active:bg-blue-500 text-white px-3 py-1.5 rounded-[5px]"
                                    >
                                        Détails
                                    </button>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
        </section>
    )
}

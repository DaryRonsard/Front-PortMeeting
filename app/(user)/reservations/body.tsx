"use client"

import apiClient from '@/utils/api-client';
import React, { useEffect } from 'react'
import { directionsList, RoomsByDirectionList } from '@/utils/directions-infos'
import Link from 'next/link'
import { useRouter } from 'next/navigation';


export default function Body() {
    
    const router = useRouter()

    return (
        <section className="pl-[300px]">
            
            <div className="p-1 px-1 mb-5">
                <h3 className="font-medium text-xl text-blue-500">Mes réservations</h3>
            </div>

            <div className="grid-wrapper grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-y-2 gap-x-4 mt-4">

                {RoomsByDirectionList && RoomsByDirectionList.length > 0 &&

                    RoomsByDirectionList.filter((item: any) => item.id_direction == 2).map((item: any, index: number) => (

                        <div
                            key={index}
                            className="grid-item flex gap-3 p-3 bg-white rounded-md shadow-md"
                        >
                            <div className="w-full">
                                <div className="relative img-container h-full w-full rounded-md overflow-hidden  group">
                                    <img src={item.images[0].name} alt="software-img" className="h-full rounded-md w-full group-hover:scale-[1.1] transition-all duration-[0.5s] object-cover" />
                                </div>
                            </div>

                            <div className="w-full flex flex-col justify-between gap-y-3">
                                <div className="relative">
                                    <div className="">
                                        <h3 className="text-blue-500 font-medium overflow-hidden text-nowrap text-ellipsis">
                                            Direction ({item.name})
                                        </h3>
                                        <h3 className="text-blue-500 font-medium overflow-hidden text-nowrap text-ellipsis my-1">
                                            {item.description}
                                        </h3>
                                        <div className="flex items-center gap-1">
                                            <i className="fa-regular fa-calendar text-blue-500"></i>
                                            <span className="text-md text-blue-500">{new Date().toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <i className="fa-regular fa-clock text-blue-500"></i>
                                            <span className="text-md text-blue-500">10:30 - 11:00</span>
                                        </div>
                                        <div className="flex items-center gap-x-2 my-1">
                                            <i className="fa-solid fa-users text-blue-500"></i>
                                            <span className="text-blue-600">5-7 Participants</span>
                                        </div>
                                        <div className="flex items-center gap-x-2 my-1">
                                            <i className="fa-solid fa-video text-red-500"></i>
                                            <span className="text-gray-600">Projecteur</span>
                                        </div>
                                        <div className="flex items-center gap-x-2 my-1">
                                            <i className="fa-solid fa-tv text-green-500"></i>
                                            <span className="text-gray-600">Écran</span>
                                        </div>
                                        <div className="flex items-center gap-x-2 my-1">
                                            <i className="fa-solid fa-mobile-screen text-blue-500"></i>
                                            <span className="text-gray-600">Tablette</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        // onClick={() => router.push(`/directions/${id}/salles/${item.id_room}`)}
                                        className="bg-green-500 hover:bg-green-600 hover:active:bg-green-500 text-white px-3 py-1.5 rounded-[5px] w-full"
                                    >
                                        Libérer
                                    </button>
                                    <button
                                        // onClick={() => router.push(`/directions/${id}/salles/${item.id_room}`)}
                                        className="bg-red-500 hover:bg-red-600 hover:active:bg-red-500 text-white px-3 py-1.5 rounded-[5px] w-full"
                                    >
                                        Annuler
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

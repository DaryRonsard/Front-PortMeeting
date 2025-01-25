"use client"

import apiClient, { apiBaseURL } from '@/utils/api-client';
import React, { useEffect, useState } from 'react'
import { directionsList } from '@/utils/directions-infos'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';


export default function Body() {

    
    const router = useRouter()
    const {id} = useParams()


    const [roomsList,setRoomsList] = useState<any>([])

    const loadingData = async () => {
        // const response = await apiClient.get(`${apiBaseURL}/api/V1/rooms/rooms/${id}`)
        const response = await apiClient.get(`${apiBaseURL}/api/V1/rooms/rooms/`)
        setRoomsList(response.data?.length > 0 ? response.data : [])
        console.log(response.data);
    }

    useEffect(() => {
        loadingData()
    },[])


    return (
        <section className="pl-[300px]">
            <div className="flex items-center justify-between p-1 px-1 mb-5">
                <h3 className="font-medium text-xl text-blue-500">Liste des salles (2)</h3>
                <button className="flex items-center gap-x-1 bg-green-500 rounded-md px-3 py-1 text-white">
                    <i className="fa-solid fa-plus text-white pointer-events-none"></i>
                    Ajouter une salle
                </button>
            </div>
            <div className="grid-wrapper grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-2 gap-x-4 mt-4">

                {roomsList && roomsList.length > 0 &&

                    roomsList?.map((item:any,index:number) =>  (

                        <div
                            key={index} 
                            className="grid-item flex flex-col justify-between p-3 bg-white rounded-md shadow-md"
                        >
                            <div className="relative img-container h-[175px] rounded-md overflow-hidden  group">
                                {/* <img src={item?.images[0]?.name || ""} alt="software-img" className="h-full rounded-md w-full group-hover:scale-[1.1] transition-all duration-[0.5s]"/> */}
                                {index == 0 ?
                                    <img src={"/images/rooms/preparer-sa-salle.jpg"} alt="software-img" className="h-full rounded-md w-full group-hover:scale-[1.1] transition-all duration-[0.5s]"/>
                                : index == 1 ? 
                                    <img src={"/images/rooms/pm_8909_58_58822-mmwv489e2p-16_9_xlarge.jpg"} alt="software-img" className="h-full rounded-md w-full group-hover:scale-[1.1] transition-all duration-[0.5s]"/>
                                :
                                    <img src={"/images/rooms/preparer-sa-salle.jpg"} alt="software-img" className="h-full rounded-md w-full group-hover:scale-[1.1] transition-all duration-[0.5s]"/>
                                }
                            </div>
                            <div className="my-1 w-full flex flex-col justify-between gap-y-3">
                                <div className="relative">
                                    <h3 className="text-blue-500 font-medium overflow-hidden text-nowrap text-ellipsis">
                                        {item?.localisation}
                                    </h3>
                                    <div className="my-2">
                                        <div className="flex items-center gap-x-2 my-1">
                                            <i className="fa-solid fa-users text-blue-500"></i>
                                            {/* <span className="text-blue-600">7 Participants</span> */}
                                            <span className="text-blue-600">
                                                {item?.capacite && item?.capacite > 1 ? ` ${item?.capacite} Participants` : `${item?.capacite} Participant`}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-x-2 my-1">
                                            {/* {RoomTools && RoomTools?.length > 0 && 
                                                RoomTools.map((item:any,index:number) => (
                                                    item?.nom == "Projecteur" ? 
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
                                            } */}
                                            
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
                                        onClick={() => router.push(`/directions/${id}/salles/${item?.id_room}`)}  
                                        className="bg-blue-500 hover:bg-blue-600 hover:active:bg-blue-500 text-white px-3 py-1.5 rounded-[5px]"
                                    >
                                        Détails
                                    </button>
                                    <button 
                                        onClick={() => router.push(`/directions/${id}/salles/${item?.id_room}`)}  
                                        className="bg-green-500 hover:bg-green-600 hover:active:bg-green-500 text-white px-3 py-1.5 rounded-[5px]"
                                    >
                                        Modifier
                                    </button>
                                    <button 
                                        onClick={() => router.push(`/directions/${id}/salles/${item?.id_room}`)}  
                                        className="bg-red-500 hover:bg-red-600 hover:active:bg-red-500 text-white px-3 py-1.5 rounded-[5px]"
                                    >
                                        Supprimer
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

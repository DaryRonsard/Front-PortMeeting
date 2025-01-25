"use client"

import apiClient, { apiBaseURL } from '@/utils/api-client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';


export default function Body() {

    
    const router = useRouter()
    const {id} = useParams()


    const [roomInfo,setRoomInfo] = useState<any>([])
    const [equipment,setEquipment] = useState<string | null>("")
    const [equipementList,setEquipmentList] = useState<any>([])


    const onAddEquipement = async () => {

        // console.log(equipment);

        if(equipment != "")
        {
            if(equipementList.length == 0)
            {
                setEquipmentList([equipment])
            }
            else
            {
                equipementList.includes(equipment) ? 
                alert("Désolé, vous avez déjà ajouté cet équipement") : 
                setEquipmentList([...equipementList,equipment])
            }
        }

    }

    const onDeleteEquipment = async (equipment_selected:string) => {
        equipementList.includes(equipment_selected) ? 
        setEquipmentList(equipementList.filter((equipment:any) => equipment != equipment_selected)) : null
    }

    const loadingData = async () => {

        try {
            const response = await apiClient.get(`${apiBaseURL}/api/V1/rooms/rooms/${id}/`)
            // const response = await apiClient.get(`${apiBaseURL}/api/V1/rooms/rooms/`)
            setRoomInfo(response.data || [])
            console.log(response.data);   
        } 
        catch (error) {
            console.log("Erreur survenu ",error);
        }
    }

    useEffect(() => {
        loadingData()
    },[])


    return (
        <section className="pl-[300px]">
            <div className="flex items-center justify-between p-1 px-1 mb-5">
                <h3 className="font-medium text-xl text-blue-500 flex items-center gap-x-3"> 
                    <button onClick={() => history.back()}>
                        <i className="fa-solid fa-arrow-left text-blue-500"></i> 
                    </button>
                    {/* Nouvelle direction 5 ieme étage */}
                    {roomInfo && roomInfo?.name}
                </h3>
            </div>

            
            {/* <div className="flex-wrapper grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-2 gap-x-4 mt-4"> */}
            <div className="flex-wrapper flex gap-4 mt-4">

                <div className="image-wrapper w-full">
                    <img 
                        src={`${roomInfo?.image_principale || "/images/rooms/preparer-sa-salle.jpg"}`} 
                        alt="room-picture" 
                        className="w-full h-[250px] border-[1.5px] border-blue-500"
                    />

                    <div className="grid-image grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6  gap-2 w-full mt-4">
                        {Array.from([1,2,3]).map((_,index:number) => (
                            <div key={index} className="relative image-container "> 
                                <img src="/images/rooms/preparer-sa-salle.jpg" 
                                    alt="room-picture" 
                                    className="w-full h-full rounded-[3px] border border-blue-500 cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="info-wrapper  w-full">
                    <div className="input-container w-full">
                        <p className="text-lg text-blue-500 font-medium">Nom de la salle</p>
                        <h3 className="">{roomInfo?.name}</h3>
                    </div>
                    <div className="input-container w-full">
                        <p className="text-lg text-blue-500 font-medium">Localisation</p>
                        <h3 className="">{roomInfo?.localisation}</h3>
                    </div>
                    <div className="input-container w-full">
                        <p className="text-lg text-blue-500 font-medium">Capacité</p>
                        <h3 className="">{roomInfo?.capacite}</h3>
                    </div>
                    <div className="input-container w-full mt-2">
                        <p className="text-lg text-blue-500 font-medium">Directions</p>
                        <h3 className="">{roomInfo?.direction_details?.name}</h3>
                    </div>
                    <div className="input-container w-full mt-2">
                        <p className="text-lg text-blue-500 font-medium">Equipements</p>
                        <div className="grid grid-cols-5 gap-2 mt-2">
                            {roomInfo?.room_equipments?.length > 0 &&
                                roomInfo.room_equipments.map((equipment:any,index:number) => (
                                    equipment?.equipment_details?.name == "projecteur" ?
                                        <button
                                            key={index}
                                            className="bg-gray-200 rounded-[3px] p-1"
                                        >
                                            <i className="fa-solid fa-video text-red-500"></i>
                                        </button>
                                    : equipment?.equipment_details?.name == "écran intéractif" ?
                                        <button
                                            key={index} 
                                            className="bg-gray-200 rounded-[3px] p-1"
                                        >
                                            <i className="fa-solid fa-tv text-green-500"></i>
                                        </button>
                                    : equipment?.equipment_details?.name == "micro" ?
                                        <button
                                            key={index}
                                            className="bg-gray-200 rounded-[3px] p-1"
                                        >
                                            <i className="fa-solid fa-microphone text-gray-500"></i>
                                        </button> 
                                    : equipment?.equipment_details?.name == "wifi" ?
                                        <button
                                            key={index}
                                            className="bg-gray-200 rounded-[3px] p-1"
                                        >
                                            <i className="fa-solid fa-wifi text-blue-500"></i>
                                        </button>
                                    : equipment?.equipment_details?.name == "tablette" &&
                                        <button
                                            key={index}
                                            className="bg-gray-200 rounded-[3px] p-1"
                                        >
                                            <i className="fa-solid fa-mobile-screen text-blue-500"></i>
                                        </button>
                                ))
                            }
                            
                        </div>

                    </div>
                </div>

            </div>
            
        </section>
    )
}

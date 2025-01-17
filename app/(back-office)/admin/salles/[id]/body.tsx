"use client"

import apiClient, { apiBaseURL } from '@/utils/api-client';
import React, { useEffect, useState } from 'react'
import { directionsList } from '@/utils/directions-infos'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';


export default function Body() {

    
    const router = useRouter()
    const {id} = useParams()


    const [roomInfo,setRoomInfo] = useState<any>([])

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
                        src={`${roomInfo?.image_principale || "/images/rooms/preparer-sa-salle.JPG"}`} 
                        alt="room-picture" 
                        className="w-full border-[1.5px] border-blue-500"
                    />
                    <div className="input-container w-full mt-2">
                        <button className="w-full flex items-center justify-center gap-x-1 bg-green-500 rounded-md px-3 py-[8px] text-white ">
                            {/* <i className="fa-solid fa-plus text-white pointer-events-none"></i> */}
                            Image principale
                        </button>
                    </div>
                    <div className="input-container w-full mt-4">
                        <button className="w-full flex items-center justify-center gap-x-1 bg-blue-500 rounded-md px-3 py-[8px] text-white ">
                            <i className="fa-solid fa-plus text-white pointer-events-none"></i>
                            Insérer d'autres images
                        </button>
                    </div>

                    <div className="grid-image grid grid-cols-5 gap-2 w-full mt-4">
                        {Array.from([1,2,3,4,5,6]).map((_,index:number) => (
                            <div key={index} className="relative image-container "> 
                                <button className="absolute flex items-center justify-center top-1 right-1 rounded-[50px] bg-red-500 h-[20px] w-[20px] border">
                                    <i className="fa-solid fa-trash-can text-white pointer-events-none text-[10px]"></i>
                                </button>
                                <img src="/images/rooms/preparer-sa-salle.JPG" 
                                    alt="room-picture" 
                                    className="w-full h-full rounded-[3px] border border-blue-500 cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="info-wrapper  w-full">
                    <div className="input-container w-full">
                        <p>Nom de la salle</p>
                        {/* <input 
                            type="text" 
                            name="" 
                            id="" 
                            className="w-full border border-blue-500 outline-none rounded-[3px] p-1"
                        /> */}
                        <textarea 
                            name="" 
                            id="" 
                            rows={2}
                            // cols={4}
                            value={roomInfo?.name}
                            className="w-full border border-blue-500 outline-none rounded-[3px] p-1"
                        ></textarea>
                    </div>
                    <div className="input-container w-full">
                        <p>Localisation</p>
                        <textarea 
                            name="" 
                            id="" 
                            rows={4}
                            value={roomInfo?.localisation}
                            className="w-full border border-blue-500 outline-none rounded-[3px] p-1"
                        ></textarea>
                    </div>
                    <div className="input-container w-full">
                        <p>Capacité</p>
                        <input 
                            type="number" 
                            name="" 
                            id="" 
                            value={roomInfo?.capacite}
                            className="w-full border border-blue-500 outline-none rounded-[3px] p-1"
                        />
                    </div>
                    <div className="input-container w-full mt-2">
                        <p>Directions</p>
                        <select 
                            name="" 
                            id="" 
                            className="w-full border border-blue-500 outline-none rounded-[3px] p-1"
                        >
                            <option value="">DG</option>
                            <option value="">DSIN</option>
                            <option value="">DOMSE</option>
                            <option value="">DDP</option>
                            <option value="">DIMO</option>
                            <option value="">DAAJC</option>
                            <option value="">DCAQ</option>
                            <option value="">DFC</option>
                            <option value="">DL</option>
                            <option value="">TP</option>
                        </select>
                    </div>
                    <div className="input-container w-full mt-4">
                        <button className="w-full flex items-center justify-center gap-x-1 bg-green-500 rounded-md px-3 py-[8px] text-white ">
                            {/* <i className="fa-solid fa-plus text-white pointer-events-none"></i> */}
                            Enregistrer
                        </button>
                    </div>
                </div>

            </div>
            
        </section>
    )
}

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
        <section className="pl-[285px]">
            <div className="flex items-center justify-between p-1 px-1 mb-5">
                <h3 className="font-medium text-xl text-blue-500">Liste des salles (6)</h3>
                <button className="flex items-center gap-x-1 bg-green-500 rounded-md px-3 py-1 text-white">
                    <i className="fa-solid fa-plus text-white pointer-events-none"></i>
                    Ajouter une salle
                </button>
            </div>
            
            <div className="table-wrapper">

                <table className="w-full text-center border border-gray-300">
                    <thead className="bg-gray-200 h-[40px]">
                        <tr>
                            <th className="text-center font-medium border-gray-400 border-r">
                                ID
                            </th>
                            <th className="text-center font-medium border-gray-400 border-r">
                                Nom salle
                            </th>
                            <th className="text-center font-medium border-gray-400 border-r"> 
                                Localisation
                            </th>
                            <th className="text-center font-medium border-gray-400 border-r">
                                Equipéments
                            </th>
                            <th className="text-center font-medium border-gray-400 border-r">
                                Capacité
                            </th>
                            <th className="text-center font-medium border-gray-400 border-r">
                                Direction
                            </th>
                            <th className="text-center font-medium">
                                Option
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.from([1,2,3,5,6,7].map((_,index:number) => (
                            <tr 
                                key={index} 
                                className={`${index % 2 == 0 ? "bg-blue-200" : "bg-white"} h-[40px]`}
                            >
                                <td className="border-gray-400 border-r">{++index}</td>
                                <td className="border-gray-400 border-r">Salle de reunion DG</td>
                                <td className="border-gray-400 border-r">Nouvelle Direction 5 ieme etage</td>
                                <td className="border-gray-400 border-r">
                                    <div className="flex justify-center gap-2">
                                        <i className="fa-solid fa-video text-red-500"></i>
                                        <i className="fa-solid fa-tv text-green-500"></i>
                                        <i className="fa-solid fa-mobile-screen text-blue-500"></i>
                                        <i className="fa-solid fa-wifi text-blue-500"></i>
                                        <i className="fa-solid fa-microphone text-gray-500"></i>
                                    </div>
                                </td>
                                <td className="border-gray-400 border-r">5</td>
                                <td className="border-gray-400 border-r">DG</td>
                                <td className="">
                                    <div className="flex justify-center items-center gap-1">
                                        <button 
                                            title='aperçu'
                                            onClick={() => router.push(`/admin/salles/${1}`)} 
                                            className="bg-blue-500  px-3 mx-1 rounded-[3px]"
                                        >
                                            <i className={`fa-solid fa-eye text-white`}></i>
                                        </button>
                                        <button 
                                            title='plage horaires'
                                            onClick={() => router.push(`/admin/salles/${1}/plage-horaires`)} 
                                            className="bg-blue-500  px-3 mx-1 rounded-[3px]"
                                        >
                                            <i className={`fa-solid fa-clock text-white`}></i>
                                        </button>
                                        <button
                                            title='éditer'
                                            className="bg-green-500  px-3 mx-1 rounded-[3px]"
                                        >
                                            <i className={`fa-solid fa-edit text-white`}></i>
                                        </button>
                                        <button 
                                            title='supprimer'
                                            className="bg-red-500  px-3 mx-1 rounded-[3px]"
                                        >
                                            <i className={`fa-solid fa-trash-can text-white`}></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                        )))}
                    </tbody>

                </table>

            </div>

        </section>
    )
}

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
                <h3 className="font-medium text-xl text-blue-500">Liste des équipements (5)</h3>
                <button className="flex items-center gap-x-1 bg-green-500 rounded-md px-3 py-1 text-white">
                    <i className="fa-solid fa-plus text-white pointer-events-none"></i>
                    Ajouter un équipement
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
                                Nom équipement
                            </th>
                            <th className="text-center font-medium border-gray-400 border-r"> 
                                Etat équipement
                            </th>
                            <th className="text-center font-medium border-gray-400 border-r">
                                Status équipement
                            </th>
                            <th className="text-center font-medium">
                                Option
                            </th>
                        </tr>
                    </thead>
        
                    <tbody>
                        {Array.from([1,2,3,5].map((_,index:number) => (
                            <tr 
                                key={index} 
                                className={`${index % 2 == 0 ? "bg-blue-200" : "bg-white"} h-[40px]`}
                            >
                                <td className="border-gray-400 border-r">{++index}</td>
                                <td className="border-gray-400 border-r">Projecteur</td>
                                <td className="border-gray-400 border-r">Disponible</td>
                                <td className="border-gray-400 border-r">1</td>
                                <td className="">
                                    <button className="bg-blue-500  px-3 mx-1 rounded-[3px]">
                                        <i className={`fa-solid fa-bars text-white`}></i>
                                    </button>
                                    <button className="bg-green-500  px-3 mx-1 rounded-[3px]">
                                        <i className={`fa-solid fa-edit text-white`}></i>
                                    </button>
                                    <button className="bg-red-500  px-3 mx-1 rounded-[3px]">
                                        {/* <i class="fa-solid fa-trash-can"></i> */}
                                        <i className={`fa-solid fa-trash-can text-white`}></i>
                                    </button>
                                </td>
                            </tr>

                        )))}
                    </tbody>

                </table>

            </div>

        </section>
    )
}

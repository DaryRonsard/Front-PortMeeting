"use client"

import apiClient from '@/utils/api-client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


export default function Body() {

    const router = useRouter()

    useEffect(() => {

    },[])

    return (
        
        <section className="pl-[300px]">

            <div className="flex items-center justify-between p-1 px-1 mb-5">
                <h3 className="font-medium text-xl text-blue-500">Liste des utilisateurs</h3>
                <button className="flex items-center gap-x-1 bg-green-500 rounded-md px-3 py-1 text-white">
                    <i className="fa-solid fa-plus text-white pointer-events-none"></i>
                    Ajouter un utilisateur
                </button>
            </div>

            <div className="table-wrapper">

                <table className="w-full text-center border border-gray-300">
                    <thead  className="bg-gray-200 h-[40px]">
                        <tr>
                            <th className="text-center font-medium border-gray-400 border-r">
                                ID
                            </th>
                            <th className="text-center font-medium border-gray-400 border-r">
                                Nom
                            </th>
                            <th className="text-center font-medium border-gray-400 border-r"> 
                                Prénom
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
                        {Array.from([1,2,3,5,6].map((_,index:number) => (
                            <tr 
                                key={index} 
                                className={`${index % 2 == 0 ? "bg-blue-200" : "bg-white"} h-[40px]`}
                            >
                                <td className="border-gray-400 border-r">{++index}</td>
                                <td className="border-gray-400 border-r">Hien</td>
                                <td className="border-gray-400 border-r">Dary Ronsard</td>
                                <td className="border-gray-400 border-r">DSIN</td>
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

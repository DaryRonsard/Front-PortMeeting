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

            <div className="mb-7">
                <h3 className="text-lg">Bienvenue Monsieur <span className="text-blue-600 font-medium">Hien Dary</span></h3>
            </div>

            {/* <div className="flex flex-col items-center gap-2 lg:flex-row"> */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

                <button 
                    onClick={() => router.push("/admin/directions")}
                    className="item p-5 hover:border-blue-400 transition-all duration-[0.4s] border-2 rounded-md bg-white w-full ">
                    <div className="flex items-center justify-center text-center p-2 rounded-full bg-blue-500 w-[35px] h-[35px] mx-auto">
                        <i className="fa-solid fa-house text-white "></i>
                    </div>
                    <h3 className="text-center font-medium text-blue-500 mt-3 mb-3">Directions</h3>
                    <p className="text-center font-medium bg-blue-500 text-white rounded-full py-1">10</p>
                </button>

                <button className="item p-5 hover:border-green-400 transition-all duration-[0.4s] border-2 rounded-md bg-white w-full">
                    <div className="flex items-center justify-center text-center p-2 rounded-full bg-green-500 w-[35px] h-[35px] mx-auto">
                        <i className="fa-solid fa-hourglass-half text-white "></i>
                    </div>
                    <h3 className="text-center font-medium text-green-500 mt-3 mb-3">Réservations en cours</h3>
                    <p className="text-center font-medium bg-green-500 text-white rounded-full py-1">5</p>
                </button>

                <button
                    onClick={() => router.push("/admin/reservations")} 
                    className="item p-5 hover:border-red-400 transition-all duration-[0.4s] border-2 rounded-md bg-white w-full">
                    <div className="flex items-center justify-center text-center p-2 rounded-full bg-red-500 w-[35px] h-[35px] mx-auto">
                        <i className="fa-solid fa-xmark text-white "></i>
                    </div>
                    <h3 className="text-center font-medium text-red-500 mt-3 mb-3">Réservations annulée</h3>
                    <p className="text-center font-medium bg-red-500 text-white rounded-full py-1">2</p>
                </button>

            </div>

            <div className="h-[430px] rounded-md bg-white border-2 mt-3"></div>

        </section>
    )
}

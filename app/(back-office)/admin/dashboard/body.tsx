"use client"

import apiClient, { apiBaseURL } from '@/utils/api-client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

import { dashboardProps } from '@/utils/type'


export default function Body(props:dashboardProps) {

    const [directionCount,setDirectionCount] = useState<number>(0)
    const [bookingPendingCount,setBookingPendingCount] = useState<number>(0)
    const [bookingCancelCount,setBookingCancelCount] = useState<number>(0)

    const data = [
        { name: 'Janvier', reservations: 25 },
        { name: 'Février', reservations: 45  },
        { name: 'Mars', reservations: 35 ,  },
        { name: 'Avril', reservations: 75 , },
        { name: 'Mai', reservations: 100 ,  },
        { name: 'Juin', reservations: 15 ,  },
        { name: 'Juillet', reservations: 150 , },
        { name: 'Août', reservations: 60 ,  },
        { name: 'Septembre', reservations: 80 ,},
        { name: 'Octobre', reservations: 65 , },
        { name: 'Novembre', reservations: 100 , },
        { name: 'Décembre', reservations: 200 , },
    ];

    const loadingData = async () => {

        try 
        {

            const [directionCountData,dashboardInfo] = await Promise.all([
                (await apiClient.get(`${apiBaseURL}/directions/`)).data,
                (await apiClient.get(`${apiBaseURL}/api/V1/bookings/booking/user-history/`)).data
            ])

            setDirectionCount(directionCountData.length)
            setBookingPendingCount(dashboardInfo.total_en_attente)
            setBookingCancelCount(dashboardInfo.total_annulees)

        } 
        catch (error) {
            console.log("Le serveur a rencontré un problème");
        }
    }

    useEffect(() => {
        loadingData()
    },[]);

    return (
        <section className="pl-[300px]">

            <div className="mb-7">
                <h3 className="text-lg">Bienvenue
                    <span className="text-blue-600 font-medium"> {props.first_name || "Coulibaly"} {props.last_name || "Aminata"}
                    </span>
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

                <button
                    // onClick={() => router.push("/admin/directions")}
                    className="item p-5 hover:border-blue-400 transition-all duration-[0.4s] border-2 rounded-md bg-white w-full cursor-default">
                    <div className="flex items-center justify-center text-center p-2 rounded-full bg-blue-500 w-[35px] h-[35px] mx-auto">
                        <i className="fa-solid fa-house text-white "></i>
                    </div>
                    <h3 className="text-center font-medium text-blue-500 mt-3 mb-3">
                        Directions
                    </h3>
                    <p className="text-center font-medium bg-blue-500 text-white rounded-full py-1">
                        {directionCount}
                    </p>
                </button>

                <button className="item p-5 hover:border-green-400 transition-all duration-[0.4s] border-2 rounded-md bg-white w-full cursor-default">
                    <div className="flex items-center justify-center text-center p-2 rounded-full bg-green-500 w-[35px] h-[35px] mx-auto">
                        <i className="fa-solid fa-hourglass-half text-white "></i>
                    </div>
                    <h3 className="text-center font-medium text-green-500 mt-3 mb-3">Réservations en cours</h3>
                    <p className="text-center font-medium bg-green-500 text-white rounded-full py-1">
                        {bookingPendingCount}
                    </p>
                </button>

                <button
                    className="item p-5 hover:border-red-400 transition-all duration-[0.4s] border-2 rounded-md bg-white w-full cursor-default">
                    <div className="flex items-center justify-center text-center p-2 rounded-full bg-red-500 w-[35px] h-[35px] mx-auto">
                        <i className="fa-solid fa-xmark text-white "></i>
                    </div>
                    <h3 className="text-center font-medium text-red-500 mt-3 mb-3">Réservations annulée</h3>
                    <p className="text-center font-medium bg-red-500 text-white rounded-full py-1">
                        {bookingCancelCount}
                    </p>
                </button>

            </div>

            {/* <div className="h-[430px] rounded-md bg-white border-2 mt-3"></div> */}

            {/* <h3 className="mt-2 text-lg">Histogramme des réservations</h3> */}

            <div className="flex items-center justify-between mt-3">
                <h3 className="text-lg">Histogramme des réservations</h3>
                <div className="flex gap-2">
                    <button 
                        className="text-white text-center px-3 py-1 rounded-[3px] bg-blue-500 hover:bg-blue-600"
                    >
                        Exporter en excel
                    </button>
                    <button 
                        className="text-white text-center px-3 py-1 rounded-[3px] bg-green-500 hover:bg-green-600"
                    >
                        Exporter en pdf
                    </button> 
                </div>
            </div>

            <div className="rounded-md bg-white border-2 mt-1 py-2 px-3">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip contentStyle={{ color: "gray" }} />
                        <Bar
                            dataKey="reservations"
                            fill="#3b82f6"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </section>
    )
}

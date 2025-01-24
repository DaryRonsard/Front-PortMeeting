"use client"

import apiClient, { apiBaseURL } from '@/utils/api-client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

import { dashboardProps } from '@/utils/type'


export default function Body(props:dashboardProps) {

    const router = useRouter()
    
    const barChartData = [
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

    const [bookingsList,setBookingsList] = useState<any>([])

    const loadingData = async () => {

        try 
        {
            const [bookingsData] = await Promise.all([
                (await apiClient.get(`${apiBaseURL}/api/V1/bookings/booking/`))?.data
            ])
            setBookingsList(bookingsData)
            console.log(bookingsData);
        } 
        catch (error) {
            console.log("Le serveur a rencontré un problème");
        }
    }


    useEffect(() => {
        loadingData()
    }, []);


    return (

        <section className="pl-[300px]">

            <div className="mb-5">
                <h3 className="text-lg">Bienvenue Monsieur <span className="text-blue-600 font-medium">{props?.first_name || "Hien"} {props?.last_name || "Dary"}</span></h3>
                {/* <h3 className="text-lg">Bienvenue Monsieur <span className="text-blue-600 font-medium">{props?.email}</span></h3> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

                <button 
                    onClick={() => router.push("/user/directions")}
                    className="item p-5 hover:border-blue-400 transition-all duration-[0.4s] border-2 rounded-md bg-white w-full">
                    <div className="flex items-center justify-center text-center p-2 rounded-full bg-blue-500 w-[35px] h-[35px] mx-auto">
                        <i className="fa-solid fa-house text-white"></i>
                    </div>
                    <h3 className="text-center font-medium text-blue-500 mt-3 mb-3">Directions</h3>
                    <p className="text-center font-medium bg-blue-500 text-white rounded-full py-1">14</p>
                </button>

                {/* <button className="item p-5 hover:border-green-400 transition-all duration-[0.4s] border-2 rounded-md bg-white w-full">
                    <div className="flex items-center justify-center text-center p-2 rounded-full bg-green-500 w-[35px] h-[35px] mx-auto">
                        <i className="fa-solid fa-hourglass-half text-white "></i>
                    </div>
                    <h3 className="text-center font-medium text-green-500 mt-3 mb-3">Réservations en cours</h3>
                    <p className="text-center font-medium bg-green-500 text-white rounded-full py-1">5</p>
                </button> */}

                <button
                    onClick={() => router.push("/user/reservations")} 
                    className="item p-5 hover:border-red-400 transition-all duration-[0.4s] border-2 rounded-md bg-white w-full">
                    <div className="flex items-center justify-center text-center p-2 rounded-full bg-red-500 w-[35px] h-[35px] mx-auto">
                        <i className="fa-solid fa-xmark text-white "></i>
                    </div>
                    <h3 className="text-center font-medium text-red-500 mt-3 mb-3">Réservations annulée</h3>
                    <p className="text-center font-medium bg-red-500 text-white rounded-full py-1">2</p>
                </button>

                <button
                    onClick={() => ""} 
                    className="item p-5 hover:border-[#ef8314] transition-all duration-[0.4s] border-2 rounded-md bg-white w-full">
                    <div className="flex items-center justify-center text-center p-2 rounded-full bg-[#ef8314] w-[35px] h-[35px] mx-auto">
                        <i className="fa-solid fa-clock-rotate-left text-white "></i>
                    </div>
                    <h3 className="text-center font-medium text-[#ef8314] mt-3 mb-3">Historiques</h3>
                    <p className="text-center font-medium bg-[#ef8314] text-white rounded-full py-1">6</p>
                </button>

            </div>
            
            <div className="flex items-center justify-between mt-3">
                <h3 className="text-lg">Histogramme de vos réservations</h3>
            </div>

            <div className="rounded-md bg-white border-2 mt-1 py-2 px-3">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip   contentStyle={{color:"gray"}}  />
                        <Bar 
                            dataKey="reservations" 
                            fill="#3b82f6" 
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>


            <div className="table-wrapper mt-5">
                
                <div className="flex items-center justify-between mt-3 mb-1">
                    <h3 className="text-lg">Liste des dernières réservations</h3>
                </div>

                <table className="w-full text-center border border-gray-300">
                    <thead className="bg-gray-200 h-[40px]">
                        <tr>
                            <th className="text-center font-medium border-gray-400">
                                Utilisateur
                            </th>
                            <th className="text-center font-medium border-gray-400">
                                Nom salle
                            </th>
                            <th className="text-center font-medium border-gray-400"> 
                                Date de réservation
                            </th>
                            <th className="text-center font-medium border-gray-400">
                                Heure de début et fin
                            </th>
                            <th className="text-center font-medium border-gray-400">
                                Etat
                            </th>
                        </tr>
                    </thead>

                    {/* <tbody>
                        {Array.from([1,2,3,5,6,7].map((_,index:number) => (
                            <tr 
                                key={index} 
                                className={`${index % 2 == 0 ? "bg-[#3b82f6] text-white" : "bg-white text-black"} h-[40px]`}
                            >
                                <td className={`border-gray-400`}>Ouattara Drissa</td>
                                <td className={`border-gray-400`}>Nouvelle Direction 5 ieme etage</td>
                                <td className={`border-gray-400`}>15/01/2025</td>
                                <td className={`border-gray-400`}>08:00 - 10:00</td>
                                <td className="border-gray-400 w-[50px]">
                                    <i className={`${index % 2 == 0 ? "fa-solid fa-clock text-yellow-500" : "fa-solid fa-check text-green-500"}`}></i>
                                </td>
                            </tr>

                        )))}
                    </tbody> */}

                    <tbody>
                        {bookingsList && bookingsList?.length > 0  &&
                            bookingsList.map((booking:any,index:number) => (
                                <tr 
                                    key={index} 
                                    className={`${index % 2 == 0 ? "bg-[#3b82f6] text-white" : "bg-white text-black"} h-[40px]`}
                                >
                                    <td className={`border-gray-400`}>
                                        {booking?.user_details?.first_name} {booking?.user_details?.last_name}
                                    </td>
                                    <td className={`border-gray-400`}>
                                        {booking?.salle_details?.localisation}
                                    </td>
                                    <td className={`border-gray-400`}>
                                        {new Date(booking?.date).toLocaleDateString("fr-Fr")}
                                    </td>
                                    <td className={`border-gray-400`}>
                                        {booking?.heure_debut.split(":")[0]+":"+booking?.heure_debut.split(":")[1]} -
                                        {booking?.heure_fin.split(":")[0]+":"+booking?.heure_fin.split(":")[1]}
                                    </td>
                                    <td className="border-gray-400 w-[50px]">
                                        <i className={`${booking?.etat == "en_attente" ? "fa-solid fa-clock text-yellow-500" : booking?.etat == "rejete" ? "fa-solid fa-xmark text-red-500" : booking?.etat == "validee" && "fa-solid fa-check text-green-500"}`}></i>
                                    </td>
                                </tr>

                            ))
                        }
                    </tbody>

                </table>

            </div>

        </section>
    )
}

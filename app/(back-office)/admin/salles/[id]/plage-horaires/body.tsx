"use client"

import apiClient, { apiBaseURL } from '@/utils/api-client';
import React, { useEffect, useState } from 'react'
import { directionsList } from '@/utils/directions-infos'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';


export default function Body() {


    const router = useRouter()
    const { id } = useParams()


    const [roomInfo, setRoomInfo] = useState<any>([])
    const [bookingHours,setBookingHours] = useState<any>([])
    const [loading,setLoading] = useState<boolean>(true)
    const [bookingHourListSelected,setBookingHourListSelected] = useState<any>([])
    
    
    const onSelectBookingHours = async (data:string) => {

    }
    

    const loadingData = async () => {

        try 
        {

            const [roomData,bookingHourData,bookingHourSave] = await Promise.all([
                (await apiClient.get(`${apiBaseURL}/api/V1/rooms/rooms/${id}/`)).data,
                (await apiClient.get(`${apiBaseURL}/api/V1/bookings/plage_horaire/salle/${id}/`)).data,
                (await apiClient.get(`${apiBaseURL}/api/V1/bookings/booking/`)).data
                // (await apiClient.get(`${apiBaseURL}/api/V1/bookings/booking/${id_salle}/`)).data
            ]);

            setRoomInfo(roomData || null);
            // setBookingHours(bookingHourData || []);
            // setBookingSavingList(bookingHourSave)

            const currentDate = new Date().toLocaleDateString("fr-FR") // 22/12/2024
            // const currentHour = "07:00" // heure définie par défaut au chargement
            const currentHour = new Date().toLocaleString("fr-FR",{hour:"2-digit",minute:"2-digit"}) // 16:00

            // Récupération de la liste des heures disponibles de réservation de la salle sélectionnée 
            const getCurrentBookingHoursList = bookingHourData && bookingHourData?.length > 0 ? bookingHourData.filter((item:any) => item.heure_debut >= currentHour ) : []
                    
            const getBookingHoursList = getCurrentBookingHoursList && getCurrentBookingHoursList?.length > 0 ? getCurrentBookingHoursList.filter((item:any) => {
                return  !bookingHourSave?.some((item2:any) => new Date(item2?.date).toLocaleDateString("fr-FR") == currentDate && item?.heure_debut <= item2?.heure_fin && item2?.etat == "validee")
            }) : []

            setBookingHours(bookingHourData)
            // setBookingHours(getBookingHoursList)

            // console.log(roomData); 
            // console.log(bookingHourData);
            // console.log(bookingHourSave);
            // console.log(getBookingHoursList);

        } 
        catch (error)
        {
            console.log("Une erreur s'est produite lors du chargement des données !",error)
        }
        finally
        {
            setLoading(false)
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
                    Plage horaires {roomInfo && roomInfo?.name}
                </h3>
            </div>

            <div className="flex-wrapper flex flex-col md:flex-row gap-6 mt-5">

                <div className="image-wrapper w-full">
                    <div className="booking-hour-grid-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4 mb-2">

                        {!loading && bookingHours && bookingHours?.length > 0 &&

                            bookingHours.map((item:any,index:number) => (

                                <button
                                    onClick={() => onSelectBookingHours(item.heure_debut + " - " + item?.heure_fin)}
                                    key={index}
                                    className={`border-[1.6px] shadow-md rounded-[4px] p-1 flex items-center justify-center gap-x-2 ${bookingHourListSelected.includes(item?.heure_debut + " - " + item?.heure_fin) ? "bg-[#3f6fe0] text-white border-[#3f6fe0]" : "bg-[#ffffff] border-gray-400 hover:border-blue-600"}`}
                                >
                                    <i className={`fa-regular fa-clock ${bookingHourListSelected.includes(item?.heure_debut + " - " + item?.heure_fin) ? "text-white" : "text-gray-400"} `}></i>
                                    <div className="flex gap-x-1">
                                        <span className={`font-medium ${bookingHourListSelected.includes(item?.heure_debut + " - " + item?.heure_fin) ? "text-white" : "text-blue-500"} `}>{item?.heure_debut}</span>
                                        <span className="text-gray-400">-</span>
                                        <span className={`font-medium ${bookingHourListSelected.includes(item?.heure_debut + " - " + item?.heure_fin) ? "text-white" : "text-blue-500"}`}>{item?.heure_fin}</span>
                                    </div>
                                </button>

                            ))
                        }

                    </div>

                </div>

                <div className="info-wrapper  w-full">
                    <div className="input-container w-full">
                        <p>Heure de début</p>
                        <input
                            type="time"
                            name=""
                            id=""
                            className="w-full border border-blue-500 outline-none rounded-[3px] p-1"
                        />
                    </div>
                    <div className="input-container w-full">
                        <p>Heure de fin</p>
                        <input
                            type="time"
                            name=""
                            id=""
                            className="w-full border border-blue-500 outline-none rounded-[3px] p-1"
                        />
                    </div>
                    <div className="input-container w-full mt-4">
                        <button className="w-full flex items-center justify-center gap-x-2 bg-blue-500 rounded-md px-3 py-[8px] text-white ">
                            <i className="fa-solid fa-plus text-white pointer-events-none"></i>
                            Ajouter
                        </button>
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

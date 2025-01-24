"use client"

import apiClient, { apiBaseURL } from '@/utils/api-client';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { Bounce, toast } from 'react-toastify';
import Loader from '@/components/loader';


export default function Body() {

    const { id:salle_id } = useParams()

    const [roomInfo, setRoomInfo] = useState<any>([])
    const [bookingHours,setBookingHours] = useState<any>([])
    const [loading,setLoading] = useState<boolean>(true)
    const [bookingHourListSelected,setBookingHourListSelected] = useState<any>([])
    const [startHour,setStartHour] = useState<string>("")
    const [endHour,setEndHour] = useState<string>("")
    

    const onSelectBookingHours = async (booking_hour:any) => {

        console.log(booking_hour);

        if(bookingHourListSelected.length == 0)
        {
            setBookingHourListSelected([...bookingHourListSelected,booking_hour])
        }
        else
        {
            setBookingHourListSelected(
                bookingHourListSelected.includes(booking_hour) ? 
                bookingHourListSelected.filter((booking:any) => booking != booking_hour) : 
                [...bookingHourListSelected,booking_hour]
            )
        }


    }

    const onAddNewBookingHour = async () => {

        const getBookingHourTab:any = []
        
        bookingHours?.forEach((booking:any) => {
            getBookingHourTab.push(booking?.heure_debut.trim()+"-"+booking?.heure_fin.trim())
        });
        
        const checkIfHourExist = getBookingHourTab.includes(startHour.trim()+"-"+endHour.trim())

        if(checkIfHourExist)
        {
            alert("désolé, cette plage existe déjà !")
        }
        else
        {
            const data = {
                salle:salle_id,
                heure_debut:startHour.trim(),
                heure_fin:endHour.trim()
            }

            const response = await apiClient.post(`${apiBaseURL}/api/V1/bookings/plage_horaire/`,data)

            if(response.status == 200 || response.status == 201)
            {
                await loadingData()
                toast.success("Création réussie avec succès !", {
                    position: "bottom-right",
                    autoClose:2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition:Bounce,
                });
            }
        }
    }
    
    
    const loadingData = async () => {

        try 
        {
            const [bookingHourData] = await Promise.all([
                (await apiClient.get(`${apiBaseURL}/api/V1/bookings/plage_horaire/salle/${salle_id}/`)).data,
            ]);

            setBookingHours(bookingHourData)
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
                    Plage horaires {roomInfo?.name && `(${roomInfo.name})`}
                </h3>
            </div>

            {loading && 
                <div className="flex justify-center items-center mt-[100px]">
                    <Loader/>
                </div>
            }

            {!loading && 

                <div className="flex-wrapper flex flex-col md:flex-row gap-6 mt-5">
                    
                    {bookingHours && bookingHours?.length > 0 &&

                        <div className="image-wrapper w-full">

                            <div className="booking-hour-grid-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4 mb-2">

                                {bookingHours.map((item:any,index:number) => (

                                    // <button
                                    //     onClick={() => onSelectBookingHours(item.heure_debut + " - " + item?.heure_fin)}
                                    //     key={index}
                                    //     className={`border-[1.6px] shadow-md rounded-[4px] p-1 flex items-center justify-center gap-x-2 ${bookingHourListSelected.includes(item?.heure_debut + " - " + item?.heure_fin) ? "bg-[#3f6fe0] text-white border-[#3f6fe0]" : "bg-[#ffffff] border-gray-400 hover:border-blue-600"}`}
                                    // >
                                    //     <i className={`fa-regular fa-clock ${bookingHourListSelected.includes(item?.heure_debut + " - " + item?.heure_fin) ? "text-white" : "text-gray-400"} `}></i>
                                    //     <div className="flex gap-x-1">
                                    //         <span className={`font-medium ${bookingHourListSelected.includes(item?.heure_debut + " - " + item?.heure_fin) ? "text-white" : "text-blue-500"} `}>{item?.heure_debut}</span>
                                    //         <span className="text-gray-400">-</span>
                                    //         <span className={`font-medium ${bookingHourListSelected.includes(item?.heure_debut + " - " + item?.heure_fin) ? "text-white" : "text-blue-500"}`}>{item?.heure_fin}</span>
                                    //     </div>
                                    // </button>

                                    <button
                                        onClick={() => onSelectBookingHours(item)}
                                        key={index}
                                        className={`border-[1.6px] shadow-md rounded-[4px] p-1 flex items-center justify-center gap-x-2 ${bookingHourListSelected.includes(item) ? "bg-[#3f6fe0] text-white border-[#3f6fe0]" : "bg-[#ffffff] border-gray-400 hover:border-blue-600"}`}
                                    >
                                        <i className={`fa-regular fa-clock ${bookingHourListSelected.includes(item) ? "text-white" : "text-gray-400"} `}></i>
                                        <div className="flex gap-x-1">
                                            <span className={`font-medium ${bookingHourListSelected.includes(item) ? "text-white" : "text-blue-500"} `}>{item?.heure_debut}</span>
                                            <span className="text-gray-400">-</span>
                                            <span className={`font-medium ${bookingHourListSelected.includes(item) ? "text-white" : "text-blue-500"}`}>{item?.heure_fin}</span>
                                        </div>
                                    </button>

                                ))}
    
                            </div>

                        </div>
                    
                    }

                    <div className="info-wrapper  w-full">
                        <div className="input-container w-full">
                            <p>Heure de début</p>
                            <input
                                type="time"
                                onChange={(e) => setStartHour(e.target.value)}
                                className="w-full border border-blue-500 outline-none rounded-[3px] p-1"
                            />
                        </div>
                        <div className="input-container w-full">
                            <p>Heure de fin</p>
                            <input
                                type="time"
                                onChange={(e) => setEndHour(e.target.value)}
                                className="w-full border border-blue-500 outline-none rounded-[3px] p-1"
                            />
                        </div>
                        <div className="button-container w-full mt-4">
                            <button 
                                onClick={() => onAddNewBookingHour()}
                                className="w-full flex items-center justify-center gap-x-2 bg-blue-500 rounded-md px-3 py-[8px] text-white active:bg-blue-600"
                            >
                                <i className="fa-solid fa-plus text-white pointer-events-none"></i>
                                Ajouter
                            </button>
                        </div>
                        {/* <div className="input-container w-full mt-4">
                            <button 
                                onClick={onUpdateBookingHour}
                                className="w-full flex items-center justify-center gap-x-1 bg-green-500 rounded-md px-3 py-[8px] text-white "
                            >
                                Enregistrer
                            </button>
                        </div> */}
                    </div>

                </div>
            }

        </section>
    )
}

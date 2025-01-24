"use client"

import "@/styles/user/reservation.css"
import apiClient, { apiBaseURL } from '@/utils/api-client';
import React, { useEffect, useState } from 'react'
import {RoomsByDirectionList, RoomTools } from '@/utils/room-infos'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';	
import { Bounce, toast } from 'react-toastify';
import Loader from "@/components/loader";


export default function Body() {
    
    const [showModal,setShowModal] = useState<boolean>(false)
    const [bookingsList,setBookingsList] = useState<any>([])
    const [loading,setLoading] = useState<boolean>(true)
    

    const onCancelBooking = async (booking_id:string|number) => {

        try 
        {

            const result = await Swal.fire({
                title: "Êtes-vous sûr de vouloir annuler cette réservation ?",
                text: "",
                icon: "warning",
                confirmButtonText: "Oui",
                confirmButtonColor: "#22c55e",
                cancelButtonColor: "#d33",
                showCancelButton: true,
                cancelButtonText:"Non"
            })
    
            if(result.isConfirmed)
            {
                try 
                {

                    const response = await apiClient.post(`${apiBaseURL}/api/V1/bookings/booking/${booking_id}/update-status/`,{etat:"annulee"})
    
                    if(response.status == 200)
                    {
                        setBookingsList(bookingsList.map((booking:any) => booking.id == booking_id ? {...booking,etat:"annulee"} : booking ))
    
                        toast.success(`Annulation réussie avec success !`, {
                            position: "top-right",
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
                    else
                    {
                        toast.error(`Echec de l'annulation !`, {
                            position: "top-right",
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
                catch (error) 
                {
                    toast.error(`Désolé, un problème est survenu !`, {
                        position: "top-right",
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
        catch (error) 
        {
            toast.error(`Désolé, le serveur a un problème !`, {
                position: "top-right",
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

    const onFreeUpRoom = async () => {
        
        const result = await Swal.fire({
            title: "Êtes-vous sûr de vouloir libérer cette salle ?",
            text: "",
            icon: "warning",
            confirmButtonText: "Oui",
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#d33",
            showCancelButton: true,
            cancelButtonText:"Non"
        })

        if(result.isConfirmed)
        {
            toast.success(`Salle libérée avec success !`, {
                position: "top-right",
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

    const onShowBookingNotificationModal = async () => {

        window.addEventListener("click",(e) => {

            const show_booking_cancel_modal_btn = document.querySelector("button#show-booking-notification-dialog-btn")

            // console.log(e.target);
            
            if(e.target == show_booking_cancel_modal_btn || 
                e.target == document.querySelector("button#show-booking-notification-dialog-btn > span.notification-number") ||
                e.target == document.querySelector("div.title-container") ||
                e.target == document.querySelector("div#booking-notification-dialog")
            )
            {
                // setShowModal(!showModal)
                setShowModal(true)
            }
            else if(e.target != show_booking_cancel_modal_btn)
            {
                setShowModal(false)
            }

        })

    }

    const loadingData = async () => {

        try 
        {
            const [bookingsData] = await Promise.all([
                (await apiClient.get(`${apiBaseURL}/api/V1/bookings/booking/`)).data,
            ])
            setBookingsList(bookingsData?.length > 0 ? bookingsData : [])
            console.log(bookingsData);
        } 
        catch (error) {
            console.log("Désolé, le serveur a rencontré un problème !");
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
            
            <div className="flex items-center justify-between p-1 px-1 mb-5 pr-4">

                <h3 className="font-medium text-xl text-blue-500">Mes réservations</h3>

                <button 
                    id="show-booking-notification-dialog-btn"
                    onClick={onShowBookingNotificationModal}
                    className="relative"
                >

                    <i className={`fa-solid fa-bell text-[15.3px]  text-gray-500 py-[7px] px-[7px] rounded-full text-white bg-[#3182c7] pt-2 pointer-events-none`}></i>

                    <span 
                        style={{fontSize:"13px"}}
                        className="notification-number absolute right-[-12px] bottom-[15px] bg-[#ff0000] rounded-[20px] py-[1.5px] px-[8px] text-white font-medium cursor-pointer" 
                    >
                        3
                    </span>

                    <div
                        id="booking-notification-dialog" 
                        className={`booking-cancel-notification-wrapper absolute z-[2] top-[35px] left-[-340px] w-[400px] bg-white rounded-[5px] border pt-1 px-1 ${showModal ? "active" : ""} `}
                    >
                        
                        <div className="title-container bg-red-600 p-1 text-start block rounded-[3px] mt-1 mb-2">
                            <p className="text-start pl-2 font-medium text-sm text-white pointer-events-none">Réservations annulées</p>
                        </div>

                        <div 
                            className={`notification-wrapper max-h-[172px] overflow-y-scroll px-1 mb-1`}
                        >

                            <div className="bg-gray-100 px-2 py-1 text-start block rounded-[3px] my-1 border-blue-500 border-[1.3px]">
                                <div className="flex items-center">
                                    <span className="block text-sm text-gray-700 overflow-hidden text-ellipsis text-nowrap">Nouvelle direction 3eme étage</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="font-medium text-[13px] text-blue-500">
                                        <i className={`fa-solid fa-calendar text-[13px] mr-2 rounded-full text-gray-400`}></i>
                                        11-01-2025
                                    </p>
                                    <p className="text-end text-[13px] font-medium text-sm text-blue-500">
                                        <i className={`fa-solid fa-clock text-[15px] mr-2 rounded-full text-gray-400`}></i>
                                        10:00 - 12:00
                                    </p>
                                </div>
                                <span className="block text-end text-[12px] font-medium text-gray-500 mt-1">11-01-2025</span>
                            </div>

                            <div className="bg-gray-100 px-2 py-1 text-start block rounded-[3px] my-1 border-blue-500 border-[1.3px]">
                                <div className="flex items-center">
                                    <span className="block text-sm text-gray-700 overflow-hidden text-ellipsis text-nowrap">Nouvelle direction 3eme étage</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="font-medium text-[13px] text-blue-500">
                                        <i className={`fa-solid fa-calendar text-[13px] mr-2 rounded-full text-gray-400`}></i>
                                        11-01-2025
                                    </p>
                                    <p className="text-end text-[13px] font-medium text-sm text-blue-500">
                                        <i className={`fa-solid fa-clock text-[15px] mr-2 rounded-full text-gray-400`}></i>
                                        10:00 - 12:00
                                    </p>
                                </div>
                                <span className="block text-end text-[12px] font-medium text-gray-500 mt-1">11-01-2025</span>
                            </div>


                        </div>

                    </div>

                </button>

            </div>

            {loading &&
                <div className="flex justify-center items-center mt-[100px]">
                    <Loader/>
                </div>
            }

            {!loading && bookingsList && bookingsList?.length > 0 &&
            
                <div className="grid-wrapper grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-2 gap-x-4 mt-4">
                    {
                        bookingsList.map((booking:any,index:number) => (

                            ((booking.etat == "en_attente" || booking.etat == "validee") &&

                                <div
                                    key={index}
                                    className="grid-item flex flex-col gap-3 p-3 bg-white rounded-md shadow-md"
                                >

                                    <div className="w-full">
                                        <div className="relative img-container h-full w-full rounded-md overflow-hidden  group">
                                            <img src={booking?.images?.[0]?.name || "/images/rooms/warwick-geneva-rigi-cervin.JPG"} alt="software-img" className="h-full rounded-md w-full group-hover:scale-[1.1] transition-all duration-[0.5s] object-cover" />
                                        </div>
                                    </div>

                                    <div className="w-full h-full flex flex-col justify-between gap-y-3">
                                        <div className="relative">
                                            <div className="">
                                                <h3 className="text-blue-500 font-medium overflow-hidden text-nowrap text-ellipsis">
                                                    Direction ({booking?.salle_details?.direction_details?.name})
                                                </h3>
                                                <h3 className="text-blue-500 font-medium overflow-hidden text-nowrap text-ellipsis my-1">
                                                    {booking?.salle_details?.localisation}
                                                </h3>
                                                <div className="flex items-center gap-1">
                                                    <i className="fa-regular fa-calendar text-blue-500"></i>
                                                    <span className="text-md text-blue-500">
                                                        {/* 23/01/2025 */}
                                                        {new Date(booking?.date).toLocaleDateString("fr-Fr")}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <i className="fa-regular fa-clock text-blue-500"></i>
                                                    <span className="text-md text-blue-500">
                                                        {/* 10:30 - 11:00 */}
                                                        {booking?.heure_debut.split(":")[0]+":"+booking?.heure_debut.split(":")[1]} -
                                                        {booking?.heure_fin.split(":")[0]+":"+booking?.heure_fin.split(":")[1]}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-x-2 my-1">
                                                    <i className="fa-solid fa-users text-blue-500"></i>
                                                    <span className="text-blue-600">
                                                        {/* 5 Participants */}
                                                        {booking?.salle_details?.capacite > 1 ? `${booking?.salle_details?.capacite} Participants` : `Participant`}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-x-2 my-1">

                                                    {booking?.salle_details?.room_equipments && booking?.salle_details?.room_equipments?.length > 0 && 

                                                        booking?.salle_details?.room_equipments.map((equipment:any,index:number) => (

                                                            equipment?.equipment_details?.name == "projecteur" ? 
                                                                <i className="fa-solid fa-video text-red-500" key={index}></i>
                                                            :
                                                            equipment?.equipment_details?.name == "écran intéractif" ? 
                                                                <i className="fa-solid fa-tv text-green-500" key={index}></i>
                                                            :
                                                            equipment?.equipment_details?.name == "tablette" ? 
                                                                <i className="fa-solid fa-mobile-screen text-blue-500" key={index}></i>
                                                            :
                                                            equipment?.equipment_details?.name == "wifi" ? 
                                                                <i className="fa-solid fa-wifi text-blue-500" key={index}></i>
                                                            :
                                                            equipment?.equipment_details?.name == "micro" &&
                                                                <i className="fa-solid fa-video text-gray-500" key={index}></i>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {booking?.etat == "en_attente" &&
                                                <>
                                                    <button
                                                        className="bg-[#62615d] cursor-default text-white px-3 py-1.5 rounded-[5px] w-full"
                                                    >
                                                        En cours 
                                                    </button>

                                                    <button
                                                        onClick={() => onCancelBooking(booking?.id)}
                                                        className="bg-red-500 hover:bg-red-600 hover:active:bg-red-500 text-white px-3 py-1.5 rounded-[5px] w-full"
                                                    >
                                                        Annuler
                                                    </button>
                                                </>
                                            }

                                            {booking?.etat == "validee" &&
                                                <button
                                                    onClick={() => onFreeUpRoom()}
                                                    className="bg-green-500 hover:bg-green-600 hover:active:bg-green-500 text-white px-3 py-1.5 rounded-[5px] w-full"
                                                >
                                                    Libérer
                                                </button>
                                            }
                                            
                                        </div>
                                    </div>

                                </div>
                            ) 
                        ))
                    }
                </div>
            }
        </section>
    )
}

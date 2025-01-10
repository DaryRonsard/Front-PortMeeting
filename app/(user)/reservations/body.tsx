"use client"

import apiClient from '@/utils/api-client';
import React, { useEffect } from 'react'
import {RoomsByDirectionList, RoomTools } from '@/utils/room-infos'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';	
import { Bounce, toast } from 'react-toastify';


export default function Body() {
    
    const router = useRouter()

    const onCancelBooking = async () => {

        Swal.fire({
            title: "Êtes-vous sûr de vouloir annuler cette réservation ?",
            text: "",
            icon: "warning",
            confirmButtonText: "Oui",
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#d33",
            showCancelButton: true,
            cancelButtonText:"Non"
        })
        .then((result) => {

            if(result.isConfirmed)
            {
               toast.success(`Réservation annulée avec success !`, {
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
           
        });
        
    }

    const onFreeUpRoom = async () => {

        
        Swal.fire({
            title: "Êtes-vous sûr de vouloir libérer cette salle ?",
            text: "",
            icon: "warning",
            confirmButtonText: "Oui",
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#d33",
            showCancelButton: true,
            cancelButtonText:"Non"
        })
        .then((result) => {

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
           
        });

    }

    return (
        <section className="pl-[300px]">
            
            <div className="p-1 px-1 mb-5">
                <h3 className="font-medium text-xl text-blue-500">Mes réservations</h3>
            </div>

            <div className="grid-wrapper grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-2 gap-x-4 mt-4">

                {RoomsByDirectionList && RoomsByDirectionList.length > 0 &&

                    RoomsByDirectionList.filter((item:any,index:number) => item.id_direction == 2).map((item: any, index: number) => (

                        <div
                            key={index}
                            className="grid-item flex flex-col gap-3 p-3 bg-white rounded-md shadow-md"
                        >
                            <div className="w-full">
                                <div className="relative img-container h-full w-full rounded-md overflow-hidden  group">
                                    <img src={item.images[0].name} alt="software-img" className="h-full rounded-md w-full group-hover:scale-[1.1] transition-all duration-[0.5s] object-cover" />
                                </div>
                            </div>

                            <div className="w-full h-full flex flex-col justify-between gap-y-3">
                                <div className="relative">
                                    <div className="">
                                        <h3 className="text-blue-500 font-medium overflow-hidden text-nowrap text-ellipsis">
                                            Direction ({item.name})
                                        </h3>
                                        <h3 className="text-blue-500 font-medium overflow-hidden text-nowrap text-ellipsis my-1">
                                            {item.description}
                                        </h3>
                                        <div className="flex items-center gap-1">
                                            <i className="fa-regular fa-calendar text-blue-500"></i>
                                            <span className="text-md text-blue-500">{new Date().toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <i className="fa-regular fa-clock text-blue-500"></i>
                                            <span className="text-md text-blue-500">10:30 - 11:00</span>
                                        </div>
                                        <div className="flex items-center gap-x-2 my-1">
                                            <i className="fa-solid fa-users text-blue-500"></i>
                                            <span className="text-blue-600">7 Participants</span>
                                        </div>
                                        <div className="flex items-center gap-x-2 my-1">
                                            {RoomTools && RoomTools.length > 0 && 
                                                RoomTools.map((item:any,index:number) => (
                                                    item.nom == "Projecteur" ? 
                                                        <i className="fa-solid fa-video text-red-500" key={index}></i>
                                                    :
                                                    item.nom == "Ecran" ? 
                                                        <i className="fa-solid fa-tv text-green-500" key={index}></i>
                                                    :
                                                    item.nom == "Tablette" ? 
                                                        <i className="fa-solid fa-mobile-screen text-blue-500" key={index}></i>
                                                    :
                                                    item.nom == "Micro" &&
                                                        <i className="fa-solid fa-video text-gray-500" key={index}></i>
                                                    
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {index == 0 ?
                                    
                                        <>
                                            <button
                                                // onClick={() => router.push(`/directions/${id}/salles/${item.id_room}`)}
                                                className="bg-[#62615d] cursor-default text-white px-3 py-1.5 rounded-[5px] w-full"
                                            >
                                                En cours 
                                            </button>
                                            <button
                                                onClick={() => onCancelBooking()}
                                                className="bg-red-500 hover:bg-red-600 hover:active:bg-red-500 text-white px-3 py-1.5 rounded-[5px] w-full"
                                            >
                                                Annuler
                                            </button>
                                        </>
                                    : 
                                        <>
                                            <button
                                                onClick={() => onFreeUpRoom()}
                                                className="bg-green-500 hover:bg-green-600 hover:active:bg-green-500 text-white px-3 py-1.5 rounded-[5px] w-full"
                                            >
                                                Libérer
                                            </button>
                                            {/* <button
                                                className="bg-red-500 hover:bg-red-600 hover:active:bg-red-500 text-white px-3 py-1.5 rounded-[5px] w-full"
                                            >
                                                Annuler
                                            </button> */}
                                        </>

                                    }
                                    
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
        </section>
    )
}

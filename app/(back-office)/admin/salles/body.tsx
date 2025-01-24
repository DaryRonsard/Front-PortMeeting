"use client"

import apiClient, { apiBaseURL } from '@/utils/api-client';
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { Bounce, toast } from 'react-toastify';
import Loader from '@/components/loader';
import { resolve } from 'path';
import { rejects } from 'assert';


export default function Body() {
    
    const router = useRouter()

    const [roomsList,setRoomsList] = useState<any>([])
    const [loading,setLoading] = useState<boolean>(true)


    const onDeleteRoom = async (room_id:number|string) => {

        const result = await Swal.fire({
            title: "Êtes-vous sûr de vouloir supprimer cette salle ?",
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
                const response = await apiClient.delete(`${apiBaseURL}/api/V1/rooms/rooms/${room_id}/`)

                if(response.status == 200 || response.status == 203 )
                {
                    toast.success(`Suppression réussie avec success !`, {
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

                    setRoomsList(roomsList.filter((room:any) => room.id != room_id))
                    // loadingData()
                }
                else
                {
                    toast.error(`Echec de la suppression !`, {
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
            catch (error) {
                toast.error(`Désolé, le serveur n'est pas opérationnel !`, {
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
                console.log("désolé, le serveur a rencontre un problème ",error);
            }
            
        }
    }

    const loadingData = async () => {
        try {
            const [roomsData] = await Promise.all([
                (await apiClient.get(`${apiBaseURL}/api/V1/rooms/rooms/`)).data,
            ])
            setRoomsList(roomsData?.length > 0 ? roomsData : [])
            console.log(roomsData);
        } 
        catch (error) {
            console.log("Erreur survenu au niveau du serveur");            
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
        <section className="pl-[285px]">

            <div className="flex items-center justify-between p-1 px-1 mb-5">

                <h3 className="font-medium text-xl text-blue-500">Liste des salles {!loading && roomsList && roomsList?.length > 0 && `(${roomsList?.length})`}</h3>

                {!loading &&
                    <button 
                        onClick={() => router.push("/admin/salles/create")}
                        className="flex items-center gap-x-1 bg-green-500 rounded-md px-3 py-1 text-white"
                    >
                        <i className="fa-solid fa-plus text-white pointer-events-none"></i>
                        Ajouter une salle
                    </button>
                }

            </div>
            
            {loading && 
                <div className="flex justify-center items-center mt-[100px]">
                    <Loader/>
                </div>
            }

            {!loading && roomsList && roomsList.length > 0 &&

                <>
                    <div className="table-wrapper">

                        <table className="w-full text-center border border-gray-300">

                            <thead className="bg-gray-200 h-[40px]">
                                <tr>
                                    <th className="text-center font-medium border-gray-400">
                                        N
                                    </th>
                                    <th className="text-center font-medium border-gray-400">
                                        Nom salle
                                    </th>
                                    <th className="text-center font-medium border-gray-400"> 
                                        Localisation
                                    </th>
                                    <th className="text-center font-medium border-gray-400">
                                        Equipéments
                                    </th>
                                    <th className="text-center font-medium border-gray-400">
                                        Capacité
                                    </th>
                                    <th className="text-center font-medium border-gray-400">
                                        Direction
                                    </th>
                                    <th className="text-center font-medium">
                                        Option
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {roomsList && roomsList?.length > 0 && 

                                    roomsList.map((room:any,index:number) => (
                                        
                                        <tr 
                                            key={index} 
                                            className={`${index % 2 == 0 ? "bg-blue-200" : "bg-white"} h-[40px]`}
                                        >
                                            <td className="border-gray-400  w-[50px]">{++index}</td>
                                            <td className="border-gray-400 ">
                                                {/* Salle de reunion DG */}
                                                {room?.name}
                                            </td>
                                            <td className="border-gray-400 ">
                                                {/* Nouvelle Direction 5 ieme etage */}
                                                {room?.localisation}
                                            </td>
                                            <td className="border-gray-400 ">
                                                <div className="flex justify-center gap-2">
                                                    {room?.equipment_details && room?.equipment_details?.length > 0 &&

                                                        room?.equipment_details.map((equipment:any,index:number) => (

                                                            equipment?.name == "projecteur" ? 
                                                                <i key={index} className="fa-solid fa-video text-red-500"></i>
                                                            : equipment?.name == "écran intéractif" ? 
                                                                <i key={index} className="fa-solid fa-tv text-green-500"></i>
                                                            : equipment?.name == "tablette" ? 
                                                                <i key={index} className="fa-solid fa-mobile-screen text-blue-500"></i>
                                                            : equipment?.name == "wifi" ? 
                                                                <i key={index} className="fa-solid fa-wifi text-blue-500"></i>
                                                            : equipment?.name == "micro" &&
                                                                <i key={index} className="fa-solid fa-microphone text-blue-500"></i> 

                                                        ))
                                                        
                                                    }
                                                </div>
                                            </td>
                                            <td className="border-gray-400 ">{room?.capacite}</td>
                                            <td className="border-gray-400 ">
                                                {room?.direction_details?.name}
                                            </td>
                                            <td className="">
                                                <div className="flex justify-center items-center gap-1">
                                                    <button 
                                                        title='aperçu'
                                                        onClick={() => router.push(`/admin/salles/${room?.id}`)} 
                                                        className="bg-blue-500 px-3 mx-1 rounded-[3px]"
                                                    >
                                                        <i className={`fa-solid fa-eye text-white`}></i>
                                                    </button>
                                                    <button 
                                                        title='plage horaires'
                                                        onClick={() => router.push(`/admin/salles/${room?.id}/plage-horaires`)} 
                                                        className="bg-blue-500  px-3 mx-1 rounded-[3px]"
                                                    >
                                                        <i className={`fa-solid fa-clock text-white`}></i>
                                                    </button>
                                                    <button
                                                        title='éditer'
                                                        onClick={() => router.push(`/admin/salles/${room?.id}/edit`)} 
                                                        className="bg-green-500  px-3 mx-1 rounded-[3px]"
                                                    >
                                                        <i className={`fa-solid fa-edit text-white`}></i>
                                                    </button>
                                                    <button 
                                                        title='supprimer'
                                                        onClick={() => onDeleteRoom(room?.id)}
                                                        className="bg-red-500  px-3 mx-1 rounded-[3px]"
                                                    >
                                                        <i className={`fa-solid fa-trash-can text-white`}></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                    ))
                                }
                            </tbody>

                        </table>

                    </div>
                </>
            }

        </section>
    )
}

"use client"

import Loader from '@/components/loader'
import apiClient, { apiBaseURL } from '@/utils/api-client'
import { directionsList} from '@/utils/directions-infos'
import {RoomsByDirectionList } from '@/utils/room-infos'
import { RoomTools } from '@/utils/room-infos'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'


export default function Body() {

    const router = useRouter()
    const {id} = useParams()


    const [roomsList,setRoomsList] = useState<any>([])
    const [loading,setLoading] = useState<boolean>(true)

    const loadingData = async () => {
        try 
        {
            const [roomData] = await Promise.all([
                (await apiClient.get(`${apiBaseURL}/directions/${id}/rooms/`)).data
            ])
            setRoomsList(roomData)
            console.log(roomData);
        } 
        catch (error) {
            console.log("Un problème est survenu au niveau du serveur ",error);
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        loadingData()
    },[])



    return (
        <section className="pl-[300px]">

            <div className="p-1 px-1 mb-5">
                <h3 className="font-medium text-xl text-blue-500 flex items-center gap-x-3"> 
                    <button onClick={() => history.back()}>
                        <i className="fa-solid fa-arrow-left text-blue-500"></i> 
                    </button>
                    Salles de réunion {!loading && roomsList?.length > 0 && `(${roomsList[0]?.direction_details?.name})` }
                </h3>
            </div>

            {loading && 
                <div className="flex justify-center items-center mt-[100px]">
                    <Loader/>
                </div>
            }

            {!loading && roomsList && roomsList.length > 0 &&

                <div className="grid-wrapper grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-2 gap-x-4 mt-4">

                    {roomsList && roomsList.length > 0 &&

                        roomsList?.map((room:any,index:number) =>  (

                            <div
                                key={index} 
                                className="grid-item flex flex-col justify-between p-3 bg-white rounded-md shadow-md"
                            >
                                <div className="relative img-container h-[175px] rounded-md overflow-hidden  group">
                                    {index == 0 ?
                                        <img src={room?.image || "/images/rooms/warwick-geneva-rigi-cervin.JPG"} alt="room-img" className="h-full rounded-md w-full group-hover:scale-[1.1] transition-all duration-[0.5s]"/>
                                    : index == 1 ?
                                        <img src={room?.image || "/images/rooms/preparer-sa-salle.JPG"} alt="room-img" className="h-full rounded-md w-full group-hover:scale-[1.1] transition-all duration-[0.5s]"/>
                                    : index == 2 ?
                                        <img src={room?.image || "/images/rooms/pm_8909_58_58822-mmwv489e2p-16_9_xlarge.JPG"} alt="room-img" className="h-full rounded-md w-full group-hover:scale-[1.1] transition-all duration-[0.5s]"/>
                                    : 
                                        <img src={room?.image || "/images/rooms/photo-espace-reunion-salon-table-ovale-les-trois-colonnes-hotel-kyriad-14237853bef5c3853a7e7dd18c5e291b.JPEG"} alt="room-img" className="h-full rounded-md w-full group-hover:scale-[1.1] transition-all duration-[0.5s]"/>
                                    }
                                </div>
                                <div className="my-1 w-full flex flex-col justify-between gap-y-3">
                                    <div className="relative">
                                        <h3 className="text-blue-500 font-medium overflow-hidden text-nowrap text-ellipsis">
                                            {room?.localisation}
                                        </h3>
                                        <div className="my-2">
                                            <div className="flex items-center gap-x-2 my-1">
                                                <i className="fa-solid fa-users text-blue-500"></i>
                                                <span className="text-blue-600">
                                                    {room?.capacite > 1 ? ` ${room?.capacite} Participants` : `${room?.capacite} Participant`}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-x-2 my-1">
                                                {room?.room_equipments?.length > 0 && 
                                                
                                                    room?.room_equipments.map((equipment:any,index:number) => (
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
                                                            <i className="fa-solid fa-microphone text-gray-500" key={index}></i>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <button 
                                            onClick={() => router.push(`/user/directions/${id}/salles/${room?.id}`)}  
                                            className="bg-blue-500 hover:bg-blue-600 hover:active:bg-blue-500 text-white px-3 py-1.5 rounded-[5px]"
                                        >
                                            Détails
                                        </button>
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                </div>
            }
            
            {!loading && roomsList?.length == 0 &&
                <h3 className="font-medium text-red-500 text-center text-lg my-8">
                    Aucun résultat trouvé !
                </h3>
            }

        </section>
    )
}

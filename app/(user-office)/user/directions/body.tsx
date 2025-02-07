"use client"

import apiClient, { apiBaseURL, imageURL } from '@/utils/api-client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Loader from '@/components/loader';
import { destroyCookie } from 'nookies';
import { useRouter } from 'next/navigation';


export default function Body() {

    const [directionsList,setDirectionsList] = useState<any>([])
    const [loading,setLoading] = useState<boolean>(true)

    const loadingData = async () => {
        try 
        {
            const response = await apiClient.get(`${apiBaseURL}/directions/`)
            setDirectionsList(response.data?.length > 0 ? response.data : [])
            console.log(response.data);
        } 
        catch (error) 
        {
            console.log("Erreur survenu au niveau du serveur (directions)");
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

            <div className="p-1 px-1 mb-5">
                <h3 className="font-medium text-xl text-blue-500">
                    Liste des directions {!loading && directionsList && directionsList?.length > 0 && `(${directionsList?.length})`}
                </h3>
            </div>

            {loading && 
                <div className="flex justify-center items-center mt-[100px]">
                    <Loader/>
                </div>
            }

            {!loading && directionsList && directionsList.length > 0 &&

                <div className="grid-wrapper grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4 mt-4">

                    {
                        directionsList.map((direction:any,index:number) => (

                            <Link href={`/user/directions/${direction?.id || 1}/salles`}
                                key={index} 
                                className="grid-item flex flex-col justify-between p-3 bg-white rounded-md shadow-md"
                            >
                                <div className="img-container h-[190px] w-full">
                                    {/* <img src={ item?.images ? imageURL + `/${item?.images}` : "https://img.freepik.com/photos-gratuite/photographie-gros-plan-immeuble-grande-hauteur-mur-rideau_395237-271.jpg?semt=ais_hybrid"} alt="software-img" className="h-full w-full"/> */}
                                    {direction?.name == "DG" &&
                                        <img src={"/images/directions/direction-1.jpeg"} alt="software-img" className="h-full w-full"/>
                                    }
                                    {direction?.name == "DSIN" &&
                                        <img src={"/images/directions/direction-2.jpeg"} alt="software-img" className="h-full w-full"/>
                                    }
                                    {direction?.name == "DL" &&
                                        <img src={"/images/directions/direction-1.jpeg"} alt="software-img" className="h-full w-full"/>
                                    }
                                    {direction?.name == "DOMSE" &&
                                        <img src={"/images/directions/direction-2.jpeg"} alt="software-img" className="h-full w-full"/>
                                    }
                                    {direction?.name == "DCMC" &&
                                        <img src={"/images/directions/direction-1.jpeg"} alt="software-img" className="h-full w-full"/>
                                    }
                                    {direction?.name == "DEESP" &&
                                        <img src={"/images/directions/direction-2.jpeg"} alt="software-img" className="h-full w-full"/>
                                    }
                                    {direction?.name == "DRH" &&
                                        <img src={"/images/directions/direction-1.jpeg"} alt="software-img" className="h-full w-full"/>
                                    }
                                    {direction?.name == "DDP" &&
                                        <img src={"/images/directions/direction-2.jpeg"} alt="software-img" className="h-full w-full"/>
                                    }
                                    {direction?.name == "DAAJC" &&
                                        <img src={"/images/directions/direction-1.jpeg"} alt="software-img" className="h-full w-full"/>
                                    }
                                    {direction?.name == "DFC" &&
                                        <img src={"/images/directions/direction-1.jpeg"} alt="software-img" className="h-full w-full"/>
                                    }
                                    {direction?.name == "DAGS" &&
                                        <img src={"/images/directions/direction-1.jpeg"} alt="software-img" className="h-full w-full"/>
                                    }
                                    {direction?.name == "TP" &&
                                        <img src={"/images/directions/direction-1.jpeg"} alt="software-img" className="h-full w-full"/>
                                    }
                                    {direction?.name == "DCAQ" &&
                                        <img src={"/images/directions/direction-1.jpeg"} alt="software-img" className="h-full w-full"/>
                                    }
                                    {direction?.name == "DIMO" &&
                                        <img src={"/images/directions/direction-1.jpeg"} alt="software-img" className="h-full w-full"/>
                                    }
                                </div>
                                <div className="mt-2 px-2">
                                    <h3 className="text-blue-500 font-medium overflow-hidden text-nowrap text-ellipsis">{direction.name} ({direction?.description})</h3>
                                </div>
                            </Link>
                        ))
                    }

                </div>

            }

        </section>
    )
}

"use client"

import apiClient from '@/app/api-client';
import React, { useEffect } from 'react'
import { directionsList } from '@/utils/directions-infos'
import Link from 'next/link'


export default function Body() {

    return (
        <section className="pl-[300px]">
            <div className="p-1 px-1 mb-5">
                <h3 className="font-medium text-xl text-blue-500">Liste des directions</h3>
            </div>
            <div className="grid-wrapper grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4 mt-4">

                {directionsList && directionsList.length > 0 &&

                    directionsList.map((item:any,index:number) => (

                        <Link href={`/directions/${item.id}/salles`}
                            key={index} 
                            className="grid-item flex flex-col justify-between p-3 bg-white rounded-md shadow-md"
                        >
                            <div className="img-container h-[190px] w-full">
                                <img src={item.image} alt="software-img" className="h-full w-full"/>
                            </div>
                            <div className="mt-2 px-2">
                                <h3 className="text-blue-500 font-medium overflow-hidden text-nowrap text-ellipsis">{item.name} ({item.description})</h3>
                            </div>
                        </Link>

                    ))
                }
            </div>
        </section>
    )
}

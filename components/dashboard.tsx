"use client"

import React, { useEffect } from 'react'

export default function DashboardPage({utilisateurs}:any) {

  return (
    <div className="w-full max-w-[800px] mx-auto bg-blue-500 my-5 p-2">

        <div className="flex gap-2 flex-wrap">

            {utilisateurs && utilisateurs.length > 0 && 

                utilisateurs.map((item:any,index:number) => (
                    <div key={index} className="content bg-white p-3 rounded-sm">
                        <p>pseudo:{item.pseudo_utilisateur}</p>
                    </div>
                ))
            }
           
        </div>

    </div>
  )
}

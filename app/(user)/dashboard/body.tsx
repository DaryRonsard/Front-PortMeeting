"use client"

import apiClient from '@/utils/api-client'
import axios from 'axios'
import React, { useEffect } from 'react'


export default function Body() {


    useEffect(() => {
        const loading = async () => {
            const response = await apiClient.get("http://localhost:8000/accounts/")
            console.log(response.data)
        }
        loading()
    },[])

    return (
        <section className="pl-[300px]">
            <div className="bg-gradient-to-b from-[#ddeef5] to-gray-100 p-5 rounded-xl drop-shadow-md">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem unde, aliquid molestias rerum, nihil eum corporis fuga sapiente atque nemo commodi. Ullam doloremque a accusantium! Possimus asperiores impedit autem earum! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci ipsum minus esse soluta ex sequi odio voluptatum. Fugiat aperiam autem mollitia libero corrupti aliquid sapiente consectetur architecto quidem voluptatum. Nostrum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure omnis tempore provident officiis aperiam expedita assumenda mollitia tenetur rerum quaerat in eligendi non harum modi, dolore totam, alias temporibus. Corrupti.
                    Assumenda magni ipsum ratione dolor quis nobis dolore impedit. Atque officia rem et fugit neque consequatur esse accusamus nulla labore autem repellendus adipisci asperiores, perferendis amet eligendi placeat numquam temporibus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus aliquid, perferendis minus libero culpa dicta beatae quisquam nostrum voluptates consectetur minima maiores, quaerat possimus quo vero alias tempore repudiandae maxime!
                    Assumenda voluptates ab, cupiditate placeat mollitia necessitatibus voluptatum. Inventore temporibus nesciunt fuga, ullam laboriosam veritatis molestiae Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis error esse eveniet earum ab. Distinctio nobis minus cum saepe dolores praesentium iusto vero, ipsam odit facilis iure asperiores, sapiente dignissimos.</p>
            </div>
        </section>
    )
}

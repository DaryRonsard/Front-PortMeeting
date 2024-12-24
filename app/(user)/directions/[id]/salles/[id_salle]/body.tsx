"use client"

import {directionsList,RoomsByDirectionList,BookingHoursList} from '@/utils/directions-infos'
import Link from 'next/link'
import React, { useState } from 'react'


export default function Body({id_direction,id_salle}:{id_direction?:string,id_salle?:string}) {

    const currentDate = new Date().toLocaleDateString("fr-FR") // 22/12/2024
    const currentHour = "07:00" // heure définie par défaut au chargement de la page à titre d'exemple
    // const currentHour = new Date().toLocaleString("fr-FR",{hour:"2-digit",minute:"2-digit"}) // 16:00

    // Récupération des images de la salle sélectionnée
    const getRoomImages = RoomsByDirectionList.filter((item:any) => {
        return item.id_direction == id_direction && item.id_room == id_salle
    }).map((item:any) => item )

    // Récupération de la liste des heures disponibles de réservation de la salle sélectionnée
    const getBookingHoursList = BookingHoursList.filter((item) => {
        return item.date == currentDate && item.start_hour >= currentHour && !item.is_busy
    })

    const [activeHour,setActiveHour] = useState<number|null>(null)
    const [activeRoomImage,setActiveRoomImage] = useState<any>(getRoomImages[0]?.images[0]?.name || null)
    const [roomImageList,setRoomImageList] = useState<any>(getRoomImages || [])
    const [bookingDate,setBookingDate] = useState<string>("")
    const [bookingHours,setBookingHours] = useState<any>(getBookingHoursList || [])


    const onSearchBookingDate = () => {

        // console.log(bookingDate)

        if(bookingDate == "")
        {
            setActiveHour(null) // Réinitialisation de l'heure de réservation sélectionnée
            const currentDate = new Date().toLocaleDateString("fr-FR") // 22/12/2024
            const currentHour = "07:00" // heure définie par défaut à la recherche à titre d'exemple
            // const currentHour = new Date().toLocaleString("fr-FR",{hour:"2-digit",minute:"2-digit"}) // Exemple(16:00)
            const newBookingHoursList = BookingHoursList.filter((item) => {
                return item.date == currentDate && item.start_hour >= currentHour && !item.is_busy
            })
            setBookingHours(newBookingHoursList)
            console.log(newBookingHoursList,currentDate,currentHour)
        }
        else
        {
            setActiveHour(null) // Réinitialisation de l'heure de réservation sélectionnée
            const currentDate = new Date(bookingDate).toLocaleDateString("fr-FR") // 22/12/2024
            const currentHour = "07:00" // heure définie par défaut à la recherche à titre d'exemple
            // const currentHour = new Date().toLocaleString("fr-FR",{hour:"2-digit",minute:"2-digit"}) // Exemple(16:00)
            const newBookingHoursList = BookingHoursList.filter((item) => {
                return item.date == currentDate && item.start_hour >= currentHour && !item.is_busy
            })
    
            setBookingHours(newBookingHoursList)
            // console.log(newBookingHoursList,currentDate,currentHour)
        }

    }


    return (
        <section className="pl-[300px]">

            <div className="p-1 px-1 mb-5">
                <h3 className="font-medium text-xl text-blue-500 flex items-center gap-x-3"> 
                    <button onClick={() => history.back()}>
                        <i className="fa-solid fa-arrow-left text-blue-500"></i> 
                    </button>
                    Réservation de la salle
                </h3>
            </div>
         
            <div className="wrapper w-full flex flex-col gap-4 lg:flex-col xl:flex-row mt-4">

                {/* Left */}
                {roomImageList && roomImageList.length > 0 &&

                    roomImageList.map((room:any,index:number) => (

                        <div
                            key={index} 
                            className="flex flex-col justify-between p-3 bg-white rounded-md shadow-md lg:max-w-[800px] w-full"
                        >
                            <div className="h-full">
                                <div className="img-container h-[280px] ">
                                    <img src={activeRoomImage} alt="software-img" className="h-full rounded-md w-full object-cover"/>
                                </div>
                                <div className="name-container my-2">
                                    <h3 className="text-blue-500 font-medium overflow-hidden text-nowrap text-ellipsis">
                                        {room.description}
                                    </h3>
                                </div>
                            </div>

                            <div className="my-2 w-full flex gap-2">
                                {room.images && room.images.length > 0 && 
                                    room.images.map((image:any,index:number) => (
                                        <div key={index} 
                                            onClick={() => setActiveRoomImage(image.name)}
                                            className={`img-container w-[50px] h-[50px] ${activeRoomImage == image.name ? "border-[2px] border-blue-600" : ""}  rounded-md bg-orange-500 cursor-pointer`} 
                                            style={{background:`url('${image.name}') center/cover no-repeat`}}
                                        />
                                    ))
                                }
                                {/* <div className="img-container w-[50px] h-[50px] rounded-md bg-orange-500" style={{background:"url('https://cms.weka.ch/fileadmin_personal_schweiz/USERDATA/Direction_d_entreprise_nouveau.jpg') center/cover no-repeat"}}/>
                                <div className="img-container w-[50px] h-[50px] rounded-md bg-orange-500" style={{background:"url('https://img.freepik.com/photos-premium/immeuble-bureaux-londres-angleterre-royaume-uni_117856-436.jpg') center/cover no-repeat"}}/>
                                <div className="img-container w-[50px] h-[50px] rounded-md bg-orange-500" style={{background:"url('https://img.freepik.com/photos-gratuite/photographie-gros-plan-immeuble-grande-hauteur-mur-rideau_395237-271.jpg?semt=ais_hybrid') center/cover no-repeat"}}/>
                                <div className="img-container w-[50px] h-[50px] rounded-md bg-orange-500" style={{background:"url('https://cms.weka.ch/fileadmin_personal_schweiz/USERDATA/Direction_d_entreprise_nouveau.jpg') center/cover no-repeat"}}/>
                                <div className="img-container w-[50px] h-[50px] rounded-md bg-orange-500" style={{background:"url('https://img.freepik.com/photos-premium/immeuble-bureaux-londres-angleterre-royaume-uni_117856-436.jpg') center/cover no-repeat"}}/>
                                <div className="img-container w-[50px] h-[50px] rounded-md bg-orange-500" style={{background:"url('https://img.freepik.com/photos-gratuite/photographie-gros-plan-immeuble-grande-hauteur-mur-rideau_395237-271.jpg?semt=ais_hybrid') center/cover no-repeat"}}/> */}
                            </div>

                        </div>

                    ))
                }

                {/* Right */}
                {roomImageList && roomImageList.length > 0 &&

                    <div className="right-wrapper lg:max-w-[800px] w-full flex flex-col justify-between">

                        <div className="h-full">

                            <div className="input-container w-full">
                                <div className="flex gap-x-4">
                                    <input type="date" 
                                        onChange={(e) => setBookingDate(e.target.value)}
                                        value={bookingDate}
                                        className="w-full py-1 px-2 rounded-[4px] outline-none border-2 border-gray-400  focus-within:border-blue-400" 
                                    />
                                    <button 
                                        onClick={() => onSearchBookingDate()}
                                        className="bg-blue-500 hover:bg-blue-600 hover:active:bg-blue-500  rounded-[5px] px-7 text-white"
                                    >
                                        Recherche
                                    </button>
                                </div>
                            </div>
    
                            <div className="booking-list max-h-[160px] h-[150px] overflow-y-scroll my-1 pr-1">
    
                                <div className="date-day-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4 mb-2">
            
                                    {bookingHours && bookingHours.length > 0 && bookingHours.map((item:any,index:number) => (
    
                                        <button 
                                            onClick={() => setActiveHour(index)}
                                            key={index}
                                            className={`${activeHour == index ? "bg-[#3f6fe0] text-white border-[#3f6fe0]" : "bg-[#ffffff] border-gray-400 hover:border-blue-600 "} border-[1.6px] shadow-md rounded-[4px] p-1 flex items-center justify-center gap-x-2`}
                                        >
                                            <i className={`fa-regular fa-clock ${activeHour == index ? "text-white" : "text-gray-400"} `}></i>
                                            <div className="flex gap-x-1">
                                                <span className={`font-medium ${activeHour == index ? "text-white" : "text-blue-500"} `}>{item.start_hour}</span>
                                                <span className="text-gray-400">-</span>                                    
                                                <span className={`font-medium ${activeHour == index ? "text-white" : "text-blue-500"}`}>{item.end_hour}</span>
                                            </div>
                                        </button>
            
                                    ))}
            
                                </div>
    
                                {bookingHours && bookingHours.length == 0 &&
                                    <h3 className="font-medium text-red-500 text-center text-[17px] my-4">
                                        Aucun résultat trouvé !
                                    </h3>
                                }
    
                            </div>

                        </div>
                    
                        <div className="h-full flex flex-col justify-between">

                            <div className="h-full">

                                <div className="mt-3 bg-[#3f6fe0] py-1 px-2 rounded-[4px]">
                                    <h3 className="text-md text-white">Équipements disponibles</h3>
                                </div>
        
                                <div className="date-day-container flex gap-3 flex-wrap mt-4">
                                    <button 
                                        className={`bg-[#ffffff] border-gray-400 hover:border-blue-600 border-[1.6px] shadow-md rounded-[4px] p-1 px-3 flex items-center gap-3`}
                                    >
                                        <i className="fa-solid fa-video text-red-500"></i>
                                        <span>Projecteur</span>
                                    </button>
                                    <button 
                                        className={`bg-[#ffffff] border-gray-400 hover:border-blue-600 border-[1.6px] shadow-md rounded-[4px] p-1 px-3 flex items-center gap-3`}
                                    >
                                        <i className="fa-solid fa-tv text-green-500"></i>
                                        <span>Écran</span>
                                    </button>
                                    <button 
                                        className={`bg-[#ffffff] border-gray-400 hover:border-blue-600 border-[1.6px] shadow-md rounded-[4px] p-1 px-3 flex items-center gap-3`}
                                    >
                                        <i className="fa-solid fa-mobile-screen text-blue-500"></i>
                                        <span>Tablette</span>
                                    </button>
                                </div>

                            </div>
    
                            <div className="mt-6">
                                <button className="bg-green-500 hover:bg-green-600 hover:active:bg-green-500  rounded-[5px] py-[10px] px-7 text-white w-full">Réserver cette salle</button>
                            </div>

                        </div>

                        {/* <div className="input-container w-full mt-3">
                            <div className="flex items-center gap-x-4">
                                <input type="datetime-local" className="w-full py-1 px-2 rounded-[4px] outline-none border-2 border-gray-400  focus-within:border-blue-400" />
                                <span className="font-medium text-blue-500 uppercase">à</span>
                                <input type="datetime-local" className="w-full py-1 px-2 rounded-[4px] outline-none border-2 border-gray-400  focus-within:border-blue-400" />
                            </div>
                        </div> */}
                        

                    </div>
                }

            </div>
            
        </section>
    )
}

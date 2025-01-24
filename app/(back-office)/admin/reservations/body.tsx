"use client"

import apiClient, { apiBaseURL } from '@/utils/api-client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    useDraggable,
  } from "@nextui-org/react";
import Swal from 'sweetalert2';
import { Bounce, toast } from 'react-toastify';
import Loader from '@/components/loader';
  

export default function Body() {
    
    const [bookingInfo,setBookingInfo] = useState<any>(null)
    const [bookingsList,setBookingsList] = useState<any>([])
    const [loading,setLoading] = useState<boolean>(true)
    
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const targetRef:any = React.useRef(null);
    const {moveProps} = useDraggable({targetRef, canOverflow: true, isDisabled: !isOpen});


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

    const onShowBookingInfo = async (booking_info:any) => {
        onOpen()
        setBookingInfo(booking_info)
        console.log("Info équipement :",booking_info)
    }

    const onValidBooking = async (booking_selected:any) =>  {

        const result = await Swal.fire({
            title: "Êtes-vous sûr de vouloir confirmer cette réservation ?",
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
                const data = {
                    // salle:booking_selected.salle,
                    // date:booking_selected.date,
                    // heure_debut:booking_selected.heure_debut,
                    // heure_fin:booking_selected.heure_fin,
                    // user:booking_selected.user,
                    etat:"validee"
                }
                const response = await apiClient.post(`${apiBaseURL}/api/V1/bookings/booking/${booking_selected.id}/update-status/`,data)

                if(response.status == 200)
                {   
                    setBookingsList(bookingsList.map((booking:any) => booking.id == booking_selected.id ? {...booking,etat:"validee"} : booking))

                    toast.success(`Réservation confirmée  !`, {
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
                    toast.error(`Echec de la confirmation !`, {
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
                toast.error(`Désolé, cette plage est déjà réservée !`, {
                    position: "top-right",
                    autoClose:2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition:Bounce,
                })
            }

        }
           
    }

    const onCancelBooking = async (booking_id:string|number) =>  {

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
                const response = await apiClient.post(`${apiBaseURL}/api/V1/bookings/booking/${booking_id}/update-status/`,{etat:"rejete"})

                if(response.status == 200)
                {
                    setBookingsList(bookingsList.filter((booking:any) => booking.id != booking_id))

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
           
    }

    useEffect(() => {
        loadingData()
    },[])


    return (
        <section className="pl-[285px]">

            <div className="flex items-center justify-between p-1 px-1 mb-5">
                <h3 className="font-medium text-xl text-blue-500">Liste des réservations {!loading && bookingsList && bookingsList?.length > 0 && `(${bookingsList?.length})`}</h3>
            </div>

            {loading && 
                <div className="flex justify-center items-center mt-[100px]">
                    <Loader/>
                </div>
            }

            {!loading && bookingsList && bookingsList?.length > 0 &&
                <>
                    
                    <div className="table-wrapper">

                        <table className="w-full text-center border border-gray-300">

                            <thead className="bg-gray-200 h-[40px]">
                                <tr>
                                    <th className="text-center font-medium border-gray-400  w-[50px]">
                                        N
                                    </th>
                                    <th className="text-center font-medium border-gray-400 ">
                                        Utilisateur
                                    </th>
                                    <th className="text-center font-medium border-gray-400 ">
                                        Nom salle
                                    </th>
                                    <th className="text-center font-medium border-gray-400 "> 
                                        Date de réservation
                                    </th>
                                    <th className="text-center font-medium border-gray-400 ">
                                        Heure de début et fin
                                    </th>
                                    <th className="text-center font-medium border-gray-400 ">
                                        Etat
                                    </th>
                                    <th className="text-center font-medium">
                                        Option
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {bookingsList && bookingsList?.length > 0 &&
                                
                                    bookingsList.map((booking:any,index:number) => (
                                    <tr 
                                        key={index} 
                                        className={`${index % 2 == 0 ? "bg-blue-200" : "bg-white"} h-[40px]`}
                                    >
                                        <td className="border-gray-400 ">{++index}</td>
                                        <td className="border-gray-400 ">
                                            {booking?.user_details?.last_name} {booking?.user_details?.first_name}
                                        </td>
                                        <td className="border-gray-400 ">
                                            {/* Nouvelle Direction 5 ieme etage */}
                                            {booking?.salle_details?.localisation}
                                        </td>
                                        <td className="border-gray-400 ">
                                            {/* 15/01/2025 */}
                                            {new Date(booking?.date)?.toLocaleDateString("fr-Fr")}
                                        </td>
                                        <td className="border-gray-400 ">
                                            {/* 08:00 - 10:00 */}
                                            {/* <i className={`fa-solid fa-clock text-white`}></i> */}
                                            {booking?.heure_debut.split(":")[0]+":"+booking?.heure_debut.split(":")[1]} -
                                            {booking?.heure_fin.split(":")[0]+":"+booking?.heure_fin.split(":")[1]}
                                        </td>
                                        <td className="border-gray-400  w-[50px]">
                                            {/* En attente */}
                                            <i className={`${booking?.etat == "en_attente" ? "fa-solid fa-clock text-yellow-500" : booking?.etat == "validee" ? "fa-solid fa-check text-green-500" : "fa-solid fa-xmark text-red-500"}`}></i>
                                        </td>
                                        <td className="">
                                            <div className="flex items-center justify-center gap-1">
                                                <button 
                                                    onClick={() => onShowBookingInfo(booking)} 
                                                    className="bg-blue-500  px-3 mx-1 rounded-[3px] w-3 h-3"
                                                >
                                                    <i className={`fa-solid fa-eye text-white`}></i>
                                                </button>
                                                
                                                {booking.etat == "en_attente" &&
                                                    <>
                                                        <button
                                                            onClick={() => onValidBooking(booking)}
                                                            className="bg-green-500  px-3 mx-1 rounded-[3px] w-3 h-3"
                                                        >
                                                            <i className={`fa-solid fa-check text-white`}></i>
                                                        </button>
                                                        
                                                        <button 
                                                            onClick={() => onCancelBooking(booking?.id)}
                                                            className="bg-red-500  px-3 mx-1 rounded-[3px] w-3 h-3"
                                                        >
                                                            <i className={`fa-solid fa-xmark text-white`}></i>
                                                        </button>
                                                    </>
                                                }
                                            </div>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>

                        </table>

                    </div>
                    
                    {bookingInfo &&

                        <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader {...moveProps} className="flex flex-col gap-1 pb-0 text-blue-500">
                                            {/* Direction (DSIN) */}
                                            Direction ({bookingInfo?.salle_details?.direction_details?.name})
                                        </ModalHeader>
                                        <ModalBody>
                                            <div className="h-full">
                                                <div className="img-container h-[180px] ">
                                                    <img src={"/images/rooms/warwick-geneva-rigi-cervin.JPG"} alt="software-img" className="h-full rounded-md w-full"/>
                                                </div>
                                                <div className="name-container my-2">
                                                    <h3 className="text-blue-500 font-medium overflow-hidden text-nowrap text-ellipsis mt-1">
                                                        {/* {roomInfo?.localisation} */}
                                                        <i className={`fa-solid fa-door-open mr-2`}></i>
                                                        {/* Salle de réunion 5 ième étage */}
                                                        {bookingInfo?.salle_details?.localisation}
                                                    </h3>

                                                </div>

                                                <div className="w-full flex gap-2">
                                                    {/* {roomInfo && roomInfo?.image  && 
                                                        room?.images.map((image:any,index:number) => (
                                                            <div key={index} 
                                                                onClick={() => setActiveRoomImage(image.name)}
                                                                className={`img-container w-[50px] h-[50px] ${activeRoomImage == image?.name ? "border-[2px] border-blue-600" : ""}  rounded-md bg-orange-500 cursor-pointer`} 
                                                                style={{background:`url('${image?.name}') center/cover no-repeat`}}
                                                            />
                                                        ))
                                                    } */}

                                                    <div
                                                        className={`img-container w-[40px] h-[40px] border-[2px] border-blue-600  rounded-md bg-orange-500 cursor-pointer`} 
                                                        style={{background:`url('/images/rooms/warwick-geneva-rigi-cervin.JPG') center/cover no-repeat`}}
                                                    />

                                                    <div
                                                        className={`img-container w-[40px] h-[40px] rounded-md bg-orange-500 cursor-pointer`} 
                                                        style={{background:`url('/images/rooms/warwick-geneva-rigi-cervin.JPG') center/cover no-repeat`}}
                                                    />

                                                    <div
                                                        className={`img-container w-[40px] h-[40px] rounded-md bg-orange-500 cursor-pointer`} 
                                                        style={{background:`url('/images/rooms/warwick-geneva-rigi-cervin.JPG') center/cover no-repeat`}}
                                                    />
                                                
                                                </div>

                                                <div className="mt-2">

                                                    <h3 className="text-blue-500 font-medium overflow-hidden text-nowrap text-ellipsis mt-1">
                                                        {/* {roomInfo?.localisation} */}
                                                        Date et heure de réservation
                                                    </h3>

                                                    <div className="flex items-center gap-3">
                                                        <p className="text-blue-500 font-medium">
                                                            <i className={`fa-solid fa-calendar-days text-gray-400 mr-1`}></i>
                                                            {/* 18/01/2025  */}
                                                            {new Date(bookingInfo?.date).toLocaleDateString("fr-Fr")}
                                                        </p>
                                                        <p className="text-blue-500 font-medium">
                                                            <i className={`fa-solid fa-clock text-gray-400 mr-1`}></i>
                                                            {/* 10:00 - 12:00 */}
                                                            {bookingInfo?.heure_debut.split(":")[0]+":"+bookingInfo?.heure_debut.split(":")[1]} 
                                                            - 
                                                            {bookingInfo?.heure_fin.split(":")[0]+":"+bookingInfo?.heure_fin.split(":")[1]}
                                                        </p>
                                                    </div>

                                                </div>

                                                <div className="my-2">
                                                
                                                    <h3 className="text-blue-500 font-medium overflow-hidden text-nowrap text-ellipsis mb-1">
                                                        {/* {roomInfo?.localisation} */}
                                                        Liste des équipéments
                                                    </h3>

                                                    <div className="date-day-container flex gap-1 flex-wrap">

                                                        {bookingInfo?.salle_details?.room_equipments.map((equipment:any,index:number) => (

                                                            <button
                                                                key={index} 
                                                                className={`border-[1.6px] shadow-md rounded-[4px] py-[7px] px-3 flex items-center gap-3 bg-[#ffffff] border-gray-400 hover:border-blue-600`}
                                                            >

                                                                {equipment.equipment_details.name == "projecteur" && equipment.equipment_details.etat == "disponible" ?
                                                                    <i className={`fa-solid fa-video text-red-500`}></i>
                                                                : equipment.equipment_details.name == "écran intéractif" && equipment.equipment_details.etat == "disponible" ?
                                                                    <i className={`fa-solid fa-tv text-green-500`}></i>
                                                                : equipment.equipment_details.name == "tablette" && equipment.equipment_details.etat == "disponible" ?
                                                                    <i className={`fa-solid fa-mobile-screen text-blue-500`}></i>
                                                                : equipment.equipment_details.name == "micro" && equipment.equipment_details.etat == "disponible" ?
                                                                    <i className={`fa-solid fa-microphone text-gray-500`}></i>
                                                                : equipment.equipment_details.name == "wifi" && equipment.equipment_details.etat == "disponible" &&
                                                                    <i className={`fa-solid fa-wifi text-gray-500`}></i>
                                                                }
                                                            </button>
                                                        ))}

                                                    </div>

                                                </div>

                                            </div>
                                        </ModalBody>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>

                    }

                </>
            }

        </section>
    )
}

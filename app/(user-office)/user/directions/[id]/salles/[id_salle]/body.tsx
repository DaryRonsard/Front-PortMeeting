"use client"

import {RoomsByDirectionList} from '@/utils/room-infos'
import React, { useEffect, useState } from 'react'
import {toast,Bounce } from 'react-toastify';
import Swal from 'sweetalert2'
import apiClient, { apiBaseURL } from '@/utils/api-client'
import Loader from '@/components/loader'
import { jwtDecode } from 'jwt-decode'


export default function Body({id_direction,id_salle}:{id_direction?:string,id_salle?:string}) {

    // Récupération des images de la salle sélectionnée
    const getRoomImages = RoomsByDirectionList.filter((item:any) => {
        return item.id_direction == id_direction && item.id_room == id_salle
    }).map((item:any) => item )


    const [bookingHourListSelected,setBookingHourListSelected] = useState<any>([])
    const [activeRoomImage,setActiveRoomImage] = useState<any>(null)
    const [roomInfo,setRoomInfo] = useState<any>(null)
    const [bookingDate,setBookingDate] = useState<string>("")
    const [bookingHours,setBookingHours] = useState<any>([])
    const [loading,setLoading] = useState<boolean>(true)

    const [roomByDirectionList,setRoomByDirectionList] = useState<any>([])

    const onSearchBookingHour = async () => {
        
        setBookingHourListSelected([])
        // console.log(bookingDate)

        if(bookingDate == "")
        {

            loadingData()
            // const currentDate = new Date().toLocaleDateString("fr-FR") // 22/12/2024

            // // const currentHour = "07:00" // heure définie par défaut 

            // const currentHour = new Date().toLocaleString("fr-FR",{hour:"2-digit",minute:"2-digit"}) // Exemple(16:00)

            // const getCurrentBookingHoursList = bookingHours.filter((item:any) => item.start_hour >= currentHour );

            // const newBookingHoursList = getCurrentBookingHoursList.filter((item) => {
            //     return !BookingHoursSaving.some((item2) => item2.date == currentDate && item.start_hour <= item2.end_hour )
            // })

            // setBookingHours(newBookingHoursList)
            // // console.log(newBookingHoursList,currentDate)
        }
        else
        {
            const currentDate = new Date().toLocaleDateString("fr-FR") // 23/01/2024
            const bookingDateSelected = new Date(bookingDate).toLocaleDateString("fr-FR") // 23/01/2024
            const currentHour = new Date().toLocaleString("fr-FR",{hour:"2-digit",minute:"2-digit"}) // 16:00

            try 
            {

                const [bookingHourData,bookingHourSave] = await Promise.all([
                    (await apiClient.get(`${apiBaseURL}/api/V1/bookings/plage_horaire/salle/${id_salle}/`)).data,
                    (await apiClient.get(`${apiBaseURL}/api/V1/bookings/booking/`)).data
                ]);

                
                // Récupération de la liste des heures disponibles de réservation de la salle sélectionnée 

                const getCurrentBookingHoursList = bookingHourData && bookingHourData?.length > 0 ? bookingHourData.filter((item:any) => item.heure_debut >= currentHour ) : []

                const getBookingHoursList = (bookingDateSelected == currentDate) ? 

                    getCurrentBookingHoursList && getCurrentBookingHoursList?.length > 0 ? 
                        getCurrentBookingHoursList.filter((item:any) => !bookingHourSave?.some((item2:any) => new Date(item2?.date).toLocaleDateString("fr-FR") == currentDate && item?.heure_debut <= item2?.heure_fin ) ) 
                    : []

                : (bookingDateSelected > currentDate) ?

                    bookingHourData && bookingHourData?.length > 0 ? 
                        bookingHourData.filter((item:any) => !bookingHourSave?.some((item2:any) => new Date(item2?.date).toLocaleDateString("fr-FR") == bookingDateSelected && item?.heure_debut <= item2?.heure_fin )) 
                    : []

                : []

                setBookingHours(getBookingHoursList)

                console.log("heures de réservation :",getBookingHoursList);
                // console.log(bookingDateSelected);
                // console.log(getCurrentBookingHoursList);

            } 
            catch (error)
            {
                console.log("Une erreur s'est produite lors du chargement des données !",error)
            }
            finally
            {
                setLoading(false)
            }

        }

    }

    const onSelectBookingHours = (bookingHour:string) => {

        // console.log(bookingHour)

        if(bookingHourListSelected.includes(bookingHour))
        {
            setBookingHourListSelected(bookingHourListSelected.filter((item:string) => item != bookingHour))
        }
        else
        {
            setBookingHourListSelected([...bookingHourListSelected,bookingHour])
            console.log("Booking hours List :",[...bookingHourListSelected,bookingHour])
        }
        
    }

    const onSendBooking =  async () => {

        let bookingHourTab:string[] = []
        
        if(bookingHourListSelected.length > 0)
        {
            
            bookingHourListSelected.forEach((item:string) => {
                bookingHourTab.push(item.split("-")[0].trim())
                bookingHourTab.push(item.split("-")[1].trim())
            });
    
            const bookingHourSorted:any = bookingHourTab.sort((a:string,b:string) => {
                return a < b ? -1 : a > b ? 1 : 0 
            })
    
            const access_token:string | null = localStorage.getItem("access_token") || null
            const decode_token:any = access_token ? jwtDecode(access_token) : null
            // console.log(decode);

            const getBookingDate:string = bookingDate != "" ? new Date(bookingDate).toLocaleString("fr-FR",{year:"numeric"})+"-"+new Date(bookingDate).toLocaleString("fr-FR",{month:"2-digit"})+"-"+new Date(bookingDate).toLocaleString("fr-FR",{day:"2-digit"}) : new Date().toLocaleString("fr-FR",{year:"numeric"})+"-"+new Date().toLocaleString("fr-FR",{month:"2-digit"})+"-"+new Date().toLocaleString("fr-FR",{day:"2-digit"})

            const data = {
                salle:id_salle,
                user:decode_token?.user_id,
                date:getBookingDate,
                heure_debut:bookingHourSorted[0],
                heure_fin:bookingHourSorted[bookingHourSorted.length - 1],
                // etat:"en_attente"
            }

            try 
            {
                
                const response = await apiClient.post(`${apiBaseURL}/api/V1/bookings/booking/send_reservation/`,data)
    
                // console.log(response);
    
                if(response.status == 200 || response.status == 201)
                {
                    // Actualisation des données (plages horaires)
                    // loadingData() 
                    await onSearchBookingHour()
                    
                    toast.success(`${decode_token?.direction?.trim() == roomInfo?.direction_details?.name?.trim() ? "Réservation confirmée avec success !" : "Demande effectuée avec success !"}`, {
                        position: "bottom-right",
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
                    toast.success(`Echec de la réservation !`, {
                        position: "bottom-right",
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
                    position: "bottom-right",
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
        else if(bookingHourListSelected.length == 0)
        {

            Swal.fire({
                title: "Veuillez sélectionner l'heure de réservation SVP !",
                text: "",
                icon: "warning",
                confirmButtonText: "D'accord",
                confirmButtonColor: "#22c55e",
            })

        }
       
    }

    const loadingData = async () => {

        try 
        {

            const [roomData,bookingHourData,bookingHourSave,roomsByDirectionData] = await Promise.all([
                (await apiClient.get(`${apiBaseURL}/api/V1/rooms/rooms/${id_salle}/`)).data,
                (await apiClient.get(`${apiBaseURL}/api/V1/bookings/plage_horaire/salle/${id_salle}/`)).data,
                (await apiClient.get(`${apiBaseURL}/api/V1/bookings/booking/`)).data,
                // (await apiClient.get(`${apiBaseURL}/api/V1/bookings/booking/${id_salle}/`)).data
                (await apiClient.get(`${apiBaseURL}/directions/${id_direction}/rooms/`)).data
            ]);

            console.log(roomData);

            setRoomInfo(roomData);
            setRoomByDirectionList(roomsByDirectionData)

            const currentDate = new Date().toLocaleDateString("fr-FR") // 22/12/2024

            // const currentHour = "07:00" // heure définie par défaut (mode test)
            const currentHour = new Date().toLocaleString("fr-FR",{hour:"2-digit",minute:"2-digit"}) // 16:00

            // Récupération de la liste des heures disponibles de réservation de la salle sélectionnée 
            const getCurrentBookingHoursList = bookingHourData && bookingHourData?.length > 0 ? bookingHourData.filter((item:any) => item.heure_debut >= currentHour ) : []
                    
            const getBookingHoursList = getCurrentBookingHoursList && getCurrentBookingHoursList?.length > 0 ? getCurrentBookingHoursList.filter((item:any) => {
                return  !bookingHourSave?.some((item2:any) => new Date(item2?.date).toLocaleDateString("fr-FR") == currentDate && item?.heure_debut <= item2?.heure_fin && item2?.etat == "validee")
            }) : []

            setBookingHours(getBookingHoursList)
            // console.log(roomData); 
            // console.log(bookingHourData);
            // console.log(bookingHourSave);
            // console.log(getBookingHoursList);

        } 
        catch (error)
        {
            console.log("Une erreur s'est produite lors du chargement des données !",error)
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
                <h3 className="font-medium text-xl text-blue-500 flex items-center gap-x-3"> 
                    <button onClick={() => history.back()}>
                        <i className="fa-solid fa-arrow-left text-blue-500"></i> 
                    </button>
                    Réservation de la salle
                </h3>
            </div>

            {loading && 
                <div className="flex justify-center items-center mt-[100px]">
                    <Loader/>
                </div>
            }
         
            {!loading && 

                <div className="wrapper w-full flex flex-col gap-4 lg:flex-col xl:flex-row mt-4">

                    {/* Left wrapper */}
                    <div
                        className="flex flex-col justify-between p-3 bg-white rounded-md shadow-md lg:max-w-[800px] w-full"
                    >
                        <div className="h-full">

                            <div className="img-container h-[280px] ">
                                
                                {/* <img src={activeRoomImage || "/images/rooms/warwick-geneva-rigi-cervin.jpg"} alt="software-img" className="h-full rounded-md w-full object-cover"/> */}
                                
                                {roomByDirectionList?.findIndex((room:any) => room.id == id_salle) == 0 ?
                                    <img src={activeRoomImage || "/images/rooms/warwick-geneva-rigi-cervin.jpg"} alt="software-img" className="h-full rounded-md w-full object-cover"/>
                                : roomByDirectionList?.findIndex((room:any) => room.id == id_salle) == 1 ?
                                    <img src={activeRoomImage || "/images/rooms/preparer-sa-salle.jpg"} alt="software-img" className="h-full rounded-md w-full object-cover"/>
                                : roomByDirectionList?.findIndex((room:any) => room.id == id_salle) == 2 ?
                                    <img src={activeRoomImage || "/images/rooms/pm_8909_58_58822-mmwv489e2p-16_9_xlarge.jpg"} alt="software-img" className="h-full rounded-md w-full object-cover"/>
                                :
                                    <img src={activeRoomImage || "/images/rooms/photo-espace-reunion-salon-table-ovale-les-trois-colonnes-hotel-kyriad-14237853bef5c3853a7e7dd18c5e291b.JPEG"} alt="software-img" className="h-full rounded-md w-full object-cover"/>
                                }
                            </div>

                            <div className="name-container my-2">
                                <h3 className="text-blue-500 font-medium overflow-hidden text-nowrap text-ellipsis">
                                    {roomInfo?.localisation}
                                </h3>
                            </div>
                            
                        </div>

                        <div className="my-2 w-full flex gap-2">

                            {/* {roomInfo && roomInfo?.image  && 
                                room?.images.map((image:any,index:number) => (
                                    <div key={index} 
                                        onClick={() => setActiveRoomImage(image.name)}
                                        className={`img-container w-[50px] h-[50px] ${activeRoomImage == image?.name ? "border-[2px] border-blue-600" : ""}  rounded-md bg-orange-500 cursor-pointer`} 
                                        style={{background:`url('${image?.name}') center/cover no-repeat`}}
                                    />
                                ))
                            } */}

                            {Array.from([1,2].map((_:any,index:number) => (

                                roomByDirectionList?.findIndex((room:any) => room.id == id_salle) == 0 ?
                                    <div
                                        key={index}
                                        className={`img-container w-[50px] h-[50px] border-[2px] ${index == 0 ? "border-blue-600" : ""}  rounded-md bg-orange-500 cursor-pointer`} 
                                        style={{background:`url('/images/rooms/warwick-geneva-rigi-cervin.jpg') center/cover no-repeat`}}
                                    />

                                : roomByDirectionList?.findIndex((room:any) => room.id == id_salle) == 1 ?
                                    <div
                                        key={index}
                                        className={`img-container w-[50px] h-[50px] border-[2px] ${index == 0 ? "border-blue-600" : ""}  rounded-md bg-orange-500 cursor-pointer`} 
                                        style={{background:`url('/images/rooms/preparer-sa-salle.jpg') center/cover no-repeat`}}
                                    />
                                : roomByDirectionList?.findIndex((room:any) => room.id == id_salle) == 2 ?
                                    <div
                                        key={index}
                                        className={`img-container w-[50px] h-[50px] border-[2px] ${index == 0 ? "border-blue-600" : ""}  rounded-md bg-orange-500 cursor-pointer`} 
                                        style={{background:`url('/images/rooms/pm_8909_58_58822-mmwv489e2p-16_9_xlarge.jpg') center/cover no-repeat`}}
                                    />
                                :
                                    <div
                                        key={index}
                                        className={`img-container w-[50px] h-[50px] border-[2px] ${index == 0 ? "border-blue-600" : ""}  rounded-md bg-orange-500 cursor-pointer`} 
                                        style={{background:`url('/images/rooms/photo-espace-reunion-salon-table-ovale-les-trois-colonnes-hotel-kyriad-14237853bef5c3853a7e7dd18c5e291b.JPEG') center/cover no-repeat`}}
                                    />

                            )))}

                        </div>

                    </div>
            
                    {/* Right Wrapper */}
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
                                        onClick={() => onSearchBookingHour()}
                                        className="bg-blue-500 hover:bg-blue-600 hover:active:bg-blue-500  rounded-[5px] px-7 text-white"
                                    >
                                        Recherche
                                    </button>
                                </div>
                            </div>
    
                            <div className="booking-list-wrapper max-h-[160px] h-[150px] overflow-y-scroll my-1 pr-1">
    
                                <div className="booking-hour-grid-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4 mb-2">
            
                                    {!loading && bookingHours && bookingHours?.length > 0 && 
                                    
                                        bookingHours.map((item:any,index:number) => (
        
                                            <button 
                                                onClick={() => onSelectBookingHours(item.heure_debut + " - " + item?.heure_fin)}
                                                key={index}
                                                className={`border-[1.6px] shadow-md rounded-[4px] p-1 flex items-center justify-center gap-x-2 ${bookingHourListSelected.includes(item?.heure_debut + " - " + item?.heure_fin) ? "bg-[#3f6fe0] text-white border-[#3f6fe0]" : "bg-[#ffffff] border-gray-400 hover:border-blue-600"}`}
                                            >
                                                <i className={`fa-regular fa-clock ${bookingHourListSelected.includes(item?.heure_debut + " - " + item?.heure_fin) ? "text-white" : "text-gray-400"} `}></i>
                                                <div className="flex gap-x-1">
                                                    <span className={`font-medium ${bookingHourListSelected.includes(item?.heure_debut + " - " + item?.heure_fin) ? "text-white" : "text-blue-500"} `}>{item?.heure_debut}</span>
                                                    <span className="text-gray-400">-</span>                                    
                                                    <span className={`font-medium ${bookingHourListSelected.includes(item?.heure_debut + " - " + item?.heure_fin) ? "text-white" : "text-blue-500"}`}>{item?.heure_fin}</span>
                                                </div>
                                            </button>
                
                                        ))
                                    }
            
                                </div>
    
                                {!loading && bookingHours && bookingHours?.length == 0 &&
                                    <h3 className="font-medium text-red-500 text-center text-[17px] my-4">
                                        Aucun résultat trouvé !
                                    </h3>
                                }
    
                            </div>

                        </div>
                    
                        <div className="h-full flex flex-col justify-between">

                            <div className="h-full">

                                <div className="mt-3 bg-[#3f6fe0] py-1 px-2 rounded-[4px]">
                                    <h3 className="text-md text-white">Liste des équipements </h3>
                                </div>
        
                                <div className="date-day-container flex gap-3 flex-wrap mt-4">

                                    {!loading && roomInfo && roomInfo?.room_equipments?.length > 0 &&

                                        roomInfo?.room_equipments.map((equipment:any,index:number) => (

                                            <button 
                                                key={index}
                                                className={`border-[1.6px] shadow-md rounded-[4px] p-1 px-3 flex items-center gap-3 bg-[#ffffff] border-gray-400 hover:border-blue-600`}
                                            >
                                                {equipment?.equipment_details?.name == "projecteur" &&
                                                    <>
                                                        <i className={`fa-solid fa-video text-red-500`}></i>
                                                        <span>Projecteur</span>
                                                    </>
                                                }
                                                {equipment?.equipment_details?.name == "écran intéractif" &&
                                                    <>
                                                        <i className={`fa-solid fa-tv text-green-500`}></i>
                                                        <span>Ecran</span>
                                                    </>
                                                }
                                                {equipment?.equipment_details?.name == "tablette" &&
                                                    <>
                                                        <i className={`fa-solid fa-mobile-screen text-blue-500`}></i>
                                                        <span>Tablette</span>
                                                    </>
                                                }
                                                {equipment?.equipment_details?.name == "micro" &&
                                                    <>
                                                        <i className={`fa-solid fa-microphone text-gray-500`}></i>
                                                        <span>Micro</span>
                                                    </>
                                                }
                                                {equipment?.equipment_details?.name == "wifi" &&
                                                    <>
                                                        <i className={`fa-solid fa-wifi text-gray-500`}></i>
                                                        <span>Wifi</span>
                                                    </>
                                                }
                                            </button>
                                        ))
                                    }

                                </div>

                                {!loading && roomInfo && roomInfo?.room_equipments?.length == 0 || !loading && !roomInfo &&
                                    <p className="font-medium text-red-500 text-center text-[17px] my-4">Aucun équipements disponible !</p>
                                }

                            </div>
    
                            <div className="mt-6">
                                <button 
                                    onClick={onSendBooking}
                                    disabled={bookingHours?.length > 0 ? false : true}
                                    type="button" 
                                    className="bg-green-500 hover:bg-green-600 hover:active:bg-green-500 rounded-[5px] py-[10px] px-7 text-white w-full"
                                >
                                    Réserver cette salle
                                </button>
                            </div>

                        </div>

                    </div>

                </div>

            } 

        </section>
    )
}

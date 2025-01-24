"use client"

import apiClient, { apiBaseURL } from '@/utils/api-client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';
import { Bounce, toast } from 'react-toastify';


export default function Body() {

    
    const router = useRouter()
    const {id} = useParams()

    const [roomInfo,setRoomInfo] = useState<any>({})
    const [directionList,setDirectionList] = useState<any>([])
    const [equipmentList,setEquipmentList] = useState<any>([])
    const [equipmentSelected,setEquipmentSelected] = useState<string | null>("")
    const [equipmentListAdded,setEquipmentListAdded] = useState<any>([])
    const [mainImage,setMainImage] = useState<string>("")

    const onUploadImage = async (e:any) => {
        // const file = e.target.files[0]
        // const url = URL.createObjectURL(file)
        // const new_img = document.createElement("img")
        // new_img.onload = function(){
        //     URL.revokeObjectURL(url)
        //     new_img.src = url
        //     console.log(new_img.src);
        //     setImage(new_img.src)
        // }
    }

    const onAddEquipement = async () => {

        if(equipmentSelected != "")
        {
            if(equipmentListAdded.length == 0)
            {
                const equipment_add = equipmentList?.find((equipment:any) => equipment?.name == equipmentSelected)
                setEquipmentListAdded(equipment_add ? [equipment_add] : [])
                console.log("équipement sélectioné:",equipmentSelected);
                console.log("liste équipements:",equipmentList);
                console.log("info équipement ajoutés:",equipment_add);
            }
            else
            {
                const checkEquipmentAdded = equipmentListAdded?.find((equipment:any) => equipment?.name == equipmentSelected)

                if(!checkEquipmentAdded)
                {
                    const equipment_add = equipmentList?.find((equipment:any) => equipment?.name == equipmentSelected)
                    setEquipmentListAdded([...equipmentListAdded,equipment_add])
                    console.log("info équipement ajoutés:",equipment_add);
                }
                else
                {
                    alert("Désolé, vous avez déjà ajouté cet équipement")
                }
            }
        }

    }

    const onDeleteEquipment = async (equipment_selected:any) => {
        // setEquipmentListAdded(equipmentListAdded?.map((equipment:any) => equipment?.id == equipment_selected?.id ? {...equipment,show:!equipment?.show} : {...equipment,show:false}) )
        setEquipmentListAdded(equipmentListAdded?.filter((equipment:any) => equipment?.id !=  equipment_selected?.id))
    }
   
    const onAddRoom = async (e:React.FormEvent) => {

        e.preventDefault()
        
        const selection_direction:any = document.querySelectorAll("select#selection-direction option")
        const selection_equipment:any = document.querySelectorAll("select#selection-equipment option")

        try 
        {
            
            const data = {
                name:roomInfo?.name,
                localisation:roomInfo?.localisation,
                capacite:roomInfo?.capacite,
                direction:roomInfo?.direction,
                image:null,
                equipements:equipmentListAdded.map((equipment:any) => equipment.id),
            }

            const response = await apiClient.post(`${apiBaseURL}/api/V1/rooms/rooms/`,data)

            if(response?.status == 200 || response?.status == 201)
            {
                setRoomInfo(
                    {...roomInfo,
                        name:"",
                        localisation:"",
                        capacite:"",
                        direction:""
                    }
                )
                selection_direction[0].selected = true
                selection_equipment[0].selected = true
                setEquipmentListAdded([])
                toast.success(`Création réussie avec success !`, {
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
            console.log("désolé, le serveur a rencontré un problème",error);
        }
    }

    const loadingData = async () => {

        try {
            const [equipmentData,directionsData] = await Promise.all([
                (await apiClient.get(`${apiBaseURL}/api/V1/rooms/equipment/`))?.data,
                (await apiClient.get(`${apiBaseURL}/directions/`))?.data,
            ])
            setEquipmentList(equipmentData && equipmentData?.length > 0 ? equipmentData?.map((item:any) => item && {...item,show:false}) : [])
            setDirectionList(directionsData || [])
            console.log("Equipements:",equipmentData); 
            console.log("Directions:",directionsData); 
        } 
        catch (error) {
            console.log("Erreur survenu ",error);
        }
        
    }

    useEffect(() => {
        loadingData()
    },[])


    return (
        <section className="pl-[300px]">

            <div className="flex items-center justify-between p-1 px-1 mb-5">
                <h3 className="font-medium text-xl text-blue-500 flex items-center gap-x-3"> 
                    <button onClick={() => history.back()}>
                        <i className="fa-solid fa-arrow-left text-blue-500"></i> 
                    </button>
                    Créer une nouvelle salle
                </h3>
            </div>

            
            <form onSubmit={(e) => onAddRoom(e)} className="flex-wrapper flex gap-4 mt-4">

                <div className="image-wrapper w-full">

                    <div className="relative w-full h-[250px]">
                        <div className="image-overlay flex items-center justify-center w-full absolute top-0 right-0 bottom-0 left-0 bg-black opacity-70">
                            <div 
                                className="rounded-full flex items-center justify-center bg-white h-[40px] w-[40px] "
                            >
                                <i className="fa-solid fa-camera text-blue-600 text-xl pointer-events-none"></i>
                            </div>
                        </div> 
                        {/* <img 
                            // src={`${roomInfo?.image_principale || "/images/rooms/preparer-sa-salle.JPG"}`} 
                            src={`${mainImage}`} 
                            alt="room-picture" 
                            className="w-full h-full border-[1.5px] border-blue-500"
                        /> */}
                    </div>
                    <div className="input-container w-full mt-2">
                        <input 
                            type="file" 
                            onChange={(event) => onUploadImage(event)}
                            id="image-principale" 
                            className="hidden"
                        />
                        <button type="button" className="w-full flex items-center justify-center gap-x-1 bg-green-500 hover:bg-green-600 rounded-md px-3 py-[8px] text-white ">
                            {/* <i className="fa-solid fa-plus text-white pointer-events-none"></i> */}
                            <label 
                                htmlFor="image-principale" 
                                className="block w-full cursor-pointer"
                            >   
                                Image principale
                            </label>
                        </button>
                    </div>
                    <div className="input-container w-full mt-4">
                        <input type="file" multiple id="others-images" className="hidden"/>
                        <button type="button" className="w-full flex items-center justify-center gap-x-1 bg-blue-500 hover:bg-blue-600 rounded-md px-3 py-[8px] text-white ">
                            <i className="fa-solid fa-plus text-white pointer-events-none"></i>
                            <label 
                                htmlFor="others-images" 
                                className="block w-full cursor-pointer"
                            >   
                                Insérer d'autres images
                            </label>
                        </button>
                    </div>

                    {/* <div className="grid-image grid grid-cols-5 gap-2 w-full mt-4">
                        {Array.from([1,2,3,4,5,6]).map((_,index:number) => (
                            <div key={index} className="relative image-container "> 
                                <button className="absolute flex items-center justify-center top-1 right-1 rounded-[50px] bg-red-500 h-[20px] w-[20px] border">
                                    <i className="fa-solid fa-trash-can text-white pointer-events-none text-[10px]"></i>
                                </button>
                                <img src="/images/rooms/preparer-sa-salle.JPG" 
                                    alt="room-picture" 
                                    className="w-full h-full rounded-[3px] border border-blue-500 cursor-pointer"
                                />
                            </div>
                        ))}
                    </div> */}

                </div>

                <div className="info-wrapper w-full">
                    <div className="input-container w-full">
                        <p>Nom de la salle</p>
                        <textarea 
                            name="" 
                            id="" 
                            rows={2}
                            // cols={4}
                            onChange={(e) => setRoomInfo({...roomInfo,name:e.target.value})}
                            value={roomInfo?.name || ""}
                            className="w-full border border-blue-500 outline-none rounded-[3px] p-1"
                            required
                        ></textarea>
                    </div>
                    <div className="input-container w-full">
                        <p>Localisation</p>
                        <textarea 
                            rows={4}
                            // cols={4}
                            onChange={(e) => setRoomInfo({...roomInfo,localisation:e.target.value})}
                            value={roomInfo?.localisation || ""}
                            className="w-full border border-blue-500 outline-none rounded-[3px] p-1"
                            required
                        ></textarea>
                    </div>
                    <div className="input-container w-full">
                        <p>Capacité</p>
                        <input 
                            type="number" 
                            onChange={(e) => setRoomInfo({...roomInfo,capacite:e.target.value})}
                            value={roomInfo?.capacite || ""}
                            className="w-full border border-blue-500 outline-none rounded-[3px] p-1"
                            required
                        />
                    </div>
                    <div className="input-container w-full mt-2">
                        <p>Directions</p>
                        <select 
                            id="selection-direction"
                            onChange={(e) => setRoomInfo({...roomInfo,direction:e.target.value})}
                            className="w-full border border-blue-500 outline-none rounded-[3px] p-1"
                            required
                        >
                            <option value="">Sélectionnez la direction de la salle</option>
                            {directionList && directionList?.length > 0 &&
                                directionList.map((direction:any,index:number)=>(
                                    <option key={index} value={direction?.id}>
                                        {direction?.name.trim()}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="input-container w-full mt-2">
                        <p>Equipements</p>
                        <div className="flex gap-2">
                            <select 
                                id="selection-equipment"
                                onChange={(e) => setEquipmentSelected(e.target.value)}
                                className="w-full border border-blue-500 outline-none rounded-[3px] p-1"
                            >
                                <option value="">Choisir un équipement</option>
                                {equipmentList && equipmentList?.length > 0 &&
                                    equipmentList?.map((equipment:any,index:number)=>(
                                        <option key={index} value={equipment?.name?.trim()}>
                                            {equipment?.name?.trim()}
                                        </option>
                                    ))
                                }
                                {/* <option value="écran intéractif">Ecran intéractif</option>
                                <option value="micro">Micro</option>
                                <option value="tablette">Tablette</option>
                                <option value="wifi">Wifi</option> */}
                            </select>
                            <button 
                                type="button"
                                onClick={onAddEquipement}
                                className="w-full flex items-center justify-center gap-x-1 bg-green-500 hover:bg-green-600 rounded-md px-3 py-[8px] text-white "
                            >
                                <i className="fa-solid fa-plus text-white pointer-events-none"></i>
                                Ajouter
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-5 gap-2 mt-2">

                            {equipmentListAdded && equipmentListAdded?.length > 0 &&

                                equipmentListAdded.map((equipment:any,index:number) => (

                                    <button
                                        key={index}
                                        onClick={() => onDeleteEquipment(equipment)}
                                        className={`relative ${equipment?.etat == "indisponible" ? "bg-[#03102982]" : "bg-gray-200"}  rounded-[3px] p-1`}
                                    >
                                        {equipment?.show &&
                                            <div className="modal absolute top-[-116px] left-0 rounded-[3px] bg-white border w-full p-1 flex flex-col gap-1 "> 
                                                <button className="bg-green-500 hover:bg-green-600 p-1 rounded-sm text-white w-full">Activer</button>
                                                <button className="bg-gray-500 hover:bg-gray-600 p-1 rounded-sm text-white w-full">Désactiver</button>
                                                <button className="bg-red-500 hover:bg-red-600 p-1 rounded-sm text-white w-full">Retirer</button>
                                            </div> 
                                        }

                                        {equipment?.name == "projecteur" && 
                                            <i className={`fa-solid fa-video ${equipment?.etat == "indisponible" ? "text-[#37353596]" : "text-red-500"}  pointer-events-none`}></i>
                                        }
                                        
                                        {equipment?.name == "écran intéractif" && 
                                            <i className="fa-solid fa-tv text-green-500 pointer-events-none"></i>
                                        }

                                        {equipment?.name == "tablette" && 
                                            <i className="fa-solid fa-mobile-screen text-blue-500 pointer-events-none"></i>
                                        }
                                        {equipment?.name == "wifi" && 
                                            <i className="fa-solid fa-wifi text-blue-500 pointer-events-none"></i>
                                        }

                                        {equipment?.name == "micro" && 
                                            <i className="fa-solid fa-microphone text-gray-500"></i>
                                        }
                                    </button>
                                ))
                                
                            }

                        </div>

                    </div>
                    <div className="input-container w-full mt-4">
                        <button 
                            type="submit"
                            className="w-full flex items-center justify-center gap-x-1 bg-green-500 hover:bg-green-600 rounded-md px-3 py-[8px] text-white "
                        >
                            Enregistrer
                        </button>
                    </div>
                </div>

            </form>
            
        </section>
    )
}

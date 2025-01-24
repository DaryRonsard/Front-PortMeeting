"use client"

import apiClient, { apiBaseURL } from '@/utils/api-client';
import React, { useEffect, useState } from 'react'
import { directionsList } from '@/utils/directions-infos'
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

    const [loading,setLoading] = useState<boolean>(true)
    const [equipmentInfo,setEquipmentInfo] = useState<any>({name:""})
    const [equipmentList,setEquipmentList] = useState<any>([])
    
    const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure();
    const targetRef:any = React.useRef(null);
    const { moveProps } = useDraggable({ targetRef, canOverflow: true, isDisabled: !isOpen });


    const onAddEquipment = async (e:React.FormEvent) => {

        e.preventDefault()
        
        try 
        {

            const data = {
                name:equipmentInfo?.name,
                etat:"disponible",
            }

            const response = await apiClient.post(`${apiBaseURL}/api/V1/rooms/equipment/`,data)
            console.log(response.data);

            if(response?.status == 200 || response?.status == 201)
            {
                loadingData()
                setEquipmentInfo({...equipmentInfo,name:""})
                onClose()
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
            else
            {
                toast.error(`Echec de la création !`, {
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
            console.log("désolé, le serveur a rencontré un problème",error);
        }
    } 

    const onDeleteEquipment = async (equipment_id:string|number) => {

        const result = await Swal.fire({
            title: "Êtes-vous sûr de vouloir retirer cet équipement ?",
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
                const response = await apiClient.delete(`${apiBaseURL}/api/V1/rooms/equipment/${equipment_id}/`)
        
                if(response.status == 200 || response.status == 203)
                {
                    
                    setEquipmentList(equipmentList.filter((equipment:any) => equipment.id != equipment_id))

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
                console.log("désolé, le serveur a rencontré un problème",error);
            }

        }
    }

    const loadingData = async () => {
        try 
        {
            const [equipmentsData] = await Promise.all([
                (await apiClient.get(`${apiBaseURL}/api/V1/rooms/equipment/`)).data,
            ])
            setEquipmentList(equipmentsData)
            console.log(equipmentsData);
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
    }, [])


    return (
        <section className="pl-[300px]">

            <div className="flex items-center justify-between p-1 px-1 mb-5">

                <h3 className="font-medium text-xl text-blue-500">
                    Liste des équipements {!loading && equipmentList && equipmentList?.length > 0 && `(${equipmentList.length})`}
                </h3>

                {!loading &&
                    <button 
                        onClick={onOpen}
                        className="flex items-center gap-x-1 bg-green-500 rounded-md px-3 py-1 text-white"
                    >
                        <i className="fa-solid fa-plus text-white pointer-events-none"></i>
                        Ajouter un équipement
                    </button>
                }
            </div>

            {loading && 
                <div className="flex justify-center items-center mt-[100px]">
                    <Loader/>
                </div>
            }

            {!loading && equipmentList && equipmentList?.length > 0 &&

                <div className="table-wrapper">

                    <table className="w-full text-center border border-gray-300">

                        <thead className="bg-gray-200 h-[40px]">
                            <tr>
                                <th className="text-center font-medium border-gray-400 ">
                                    ID
                                </th>
                                <th className="text-center font-medium border-gray-400 ">
                                    Nom équipement
                                </th>
                                {/* <th className="text-center font-medium border-gray-400 ">
                                    Etat équipement
                                </th> */}
                                {/* <th className="text-center font-medium border-gray-400 ">
                                    Status équipement
                                </th> */}
                                {/* <th className="text-center font-medium border-gray-400 ">
                                    ID salle
                                </th> */}
                                <th className="text-center font-medium">
                                    Option
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {equipmentList.map((equipment: any, index: number) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 == 0 ? "bg-blue-200" : "bg-white"} h-[40px]`}
                                >
                                    <td className="border-gray-400  w-[50px]">{equipment.id}</td>
                                    <td className="border-gray-400 ">{equipment.name}</td>
                                    {/* <td className="border-gray-400 ">{equipment.etat}</td> */}
                                    <td className="">
                                        <button 
                                            className="bg-green-500  px-3 mx-1 rounded-[3px]"
                                        >
                                            <i className={`fa-solid fa-edit text-white`}></i>
                                        </button>
                                        <button 
                                            onClick={() => onDeleteEquipment(equipment.id)}
                                            className="bg-red-500  px-3 mx-1 rounded-[3px]"
                                        >
                                            <i className={`fa-solid fa-trash-can text-white`}></i>
                                        </button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>

                    </table>

                </div>
            
            }

            <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader {...moveProps} className="flex flex-col gap-1 pb-0 text-blue-500">
                                Ajouter un équipement
                            </ModalHeader>

                            <ModalBody>
                                
                                <form onSubmit={onAddEquipment} className="py-1">

                                    <div className="input-container my-1">
                                        <p className="my-1">
                                            Nom de l'équipement
                                        </p>
                                        <input type="text" 
                                            onChange={(e) => setEquipmentInfo({...equipmentInfo,name:e.target.value})}
                                            value={equipmentInfo?.name}
                                            className="border border-blue-500 rounded-[3px] outline-none py-1 w-full px-1"
                                            required
                                        />
                                    </div>

                                    {/* <div className="input-container my-1">
                                        <p className="my-1">
                                            Etat de l'équipement
                                        </p>
                                        <select
                                            id="selection-etat"
                                            onChange={(e) => setEquipmentInfo({...equipmentInfo,etat:e.target.value})}
                                            className="border border-blue-500 rounded-[3px] outline-none py-1 w-full px-1"
                                            required
                                        >
                                            <option value="">-------</option>
                                            <option value="disponible">Disponible</option>
                                            <option value="indisponible">Indisponible</option>
                                        </select>
                                    </div> */}
                                    
                                    <div className="btn-container mt-5">
                                        <button
                                            type="submit"
                                            className="flex items-center justify-center gap-x-1 bg-green-500 hover:bg-green-600 rounded-[4px] px-3 py-2 text-white w-full"
                                        >
                                            Enregistrer
                                        </button>
                                    </div>

                                </form>

                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </section>
    )
}

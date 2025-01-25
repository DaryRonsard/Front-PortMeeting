"use client"

import apiClient, { apiBaseURL } from '@/utils/api-client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
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

    const [userInfo,setUserInfo] = useState<any>({
        last_name:"",
        first_name:"",
        matricule:"",
        username:"",
        email:"",
        telepone:"",
        direction:"",
    })

    const [loading,setLoading] = useState<boolean>(true)
    const [userList,setUserList] = useState<any>([])
    const [directionList,setDirectionList] = useState<any>([])
    
    const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure();
    const targetRef:any = React.useRef(null);
    const { moveProps } = useDraggable({ targetRef, canOverflow: true, isDisabled: !isOpen });
    
    
    const onAddUser = async (e:React.FormEvent) => {

        e.preventDefault()
        
        try 
        {

            const data = {
                first_name:userInfo?.first_name,
                last_name:userInfo?.last_name,
                matricule:userInfo?.matricule,
                username:userInfo?.username,
                direction:parseInt(userInfo?.direction),
                role:"employe",
                password:"2025",
                email:userInfo?.email,
                avatar:null,
                phone_number:userInfo?.telephone,
            }

            // console.log(data);

            const response = await apiClient.post(`${apiBaseURL}/accounts/`,data)

            if(response?.status == 200 || response?.status == 201)
            {

                onClose()
                
                toast.success(`Utilisateur crée avec success !`, {
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

                const selection_direction:any = document.querySelectorAll("select#selection-direction option")

                selection_direction[0].selected = true

                setUserInfo({...userInfo,
                    first_name:"",
                    last_name:"",
                    matricule:"",
                    username:"",
                    direction:"",
                    email:"",
                    telephone:""
                })
                
                loadingData()
                
            }
            else
            {
                toast.error(`Echec de la création de l'utilisateur !`, {
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
            toast.error(`Désolé, un problème est survenu !`, {
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

    const onDeleteUser = async (utilisateur_id:string|number) => {

        try 
        {

            const response = await apiClient.delete(`${apiBaseURL}/accounts/${utilisateur_id}/`)

            if(response?.status == 200 || response?.status == 203 || response?.status == 204)
            {

                onClose()
                
                toast.success(`Utilisateur supprimée avec success !`, {
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
                
                loadingData()
                
            }
            else
            {
                toast.error(`Echec de la suppression de l'utilisateur !`, {
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
            toast.error(`Désolé, un problème est survenu !`, {
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

    const loadingData = async () => {

        try 
        {
            const [directionListData,userListData] = await Promise.all([
                (await apiClient.get(`${apiBaseURL}/directions/`)).data,
                (await apiClient.get(`${apiBaseURL}/accounts/`)).data,
            ])
            console.log(userListData);
            setUserList(userListData)
            setDirectionList(directionListData)
        } 
        catch (error) 
        {
            console.log("Le serveur a rencontré un problème");
        }
        finally
        {
            setLoading(false)
        }
    }


    useEffect(() => {
        loadingData()
    }, []);

    
    return (
        
        <section className="pl-[300px]"> 

            <div className="flex items-center justify-between p-1 px-1 mb-5">
                <h3 className="font-medium text-xl text-blue-500">Liste des utilisateurs {!loading && userList.length > 0 && `(${userList.length})`}</h3>
                <button 
                    onClick={onOpen}
                    className="flex items-center gap-x-1 bg-green-500 rounded-md px-3 py-1 text-white"
                >
                    <i className="fa-solid fa-plus text-white pointer-events-none"></i>
                    Ajouter un utilisateur
                </button>
            </div>

            {loading && 
                <div className="flex justify-center items-center mt-[100px]">
                    <Loader/>
                </div>
            }

            {!loading && userList && userList.length > 0 &&

                <div className="table-wrapper">

                    <table className="w-full text-center border border-gray-300">
                        <thead className="bg-gray-200 h-[40px]">
                            <tr>
                                <th className="text-center font-medium border-gray-400 border-r">
                                    N
                                </th>
                                <th className="text-center font-medium border-gray-400 border-r">
                                    Nom
                                </th>
                                <th className="text-center font-medium border-gray-400 border-r"> 
                                    Prénom
                                </th>
                                <th className="text-center font-medium border-gray-400 border-r"> 
                                    Matricule
                                </th>
                                <th className="text-center font-medium border-gray-400 border-r"> 
                                    Pseudo
                                </th>
                                <th className="text-center font-medium border-gray-400 border-r">
                                    Direction
                                </th>
                                <th className="text-center font-medium border-gray-400 border-r">
                                    Rôle
                                </th> 
                                <th className="text-center font-medium">
                                    Option
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {userList.map((utilisateur:any,index:number) => (

                                (utilisateur?.role != "super_admin" && 

                                    <tr 
                                        key={index} 
                                        className={`${index % 2 == 0 ? "bg-blue-200" : "bg-white"} h-[40px]`}
                                    >
                                        <td className="border-gray-400 border-r">{index++}</td>
                                        <td className="border-gray-400 border-r">
                                            {utilisateur?.first_name}
                                        </td>
                                        <td className="border-gray-400 border-r">
                                            {utilisateur?.last_name}
                                        </td>
                                        <td className="border-gray-400 border-r">
                                            {utilisateur?.matricule}
                                        </td>
                                        <td className="border-gray-400 border-r">
                                            {utilisateur?.username}
                                        </td>
                                        <td className="border-gray-400 border-r">
                                            {utilisateur?.direction}
                                        </td>
                                        <td className="border-gray-400 border-r">
                                            {utilisateur?.role}
                                        </td>
                                        <td className="">
                                            <button className="bg-blue-500  px-3 mx-1 rounded-[3px]">
                                                <i className={`fa-solid fa-eye text-white`}></i>
                                            </button>
                                            <button className="bg-green-500  px-3 mx-1 rounded-[3px]">
                                                <i className={`fa-solid fa-edit text-white`}></i>
                                            </button>
                                            <button 
                                                onClick={() => onDeleteUser(utilisateur.id) }
                                                className="bg-red-500  px-3 mx-1 rounded-[3px]">
                                                <i className={`fa-solid fa-trash-can text-white`}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ) 

                            ))}
                        </tbody>

                    </table>

                </div>
            
            }

            {!loading && userList.length == 0 &&
                <h3 className="font-medium text-red-500 text-center text-lg my-8">
                    Aucun résultat trouvé !
                </h3>
            }

            <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader {...moveProps} className="flex flex-col gap-1 pb-0 text-blue-500">
                                Créer un utilisateur
                            </ModalHeader>

                            <ModalBody>
                                
                                <form onSubmit={onAddUser} className="py-1">

                                    <div className="input-container my-1">
                                        <p className="my-1">
                                            Nom de l'utilisateur
                                        </p>
                                        <input type="text" 
                                            onChange={(e) => setUserInfo({...userInfo,first_name:e.target.value})}
                                            value={userInfo?.first_name}
                                            className="border border-blue-500 rounded-[3px] outline-none py-1 w-full px-1"
                                            required
                                        />
                                    </div>

                                    <div className="input-container my-1">
                                        <p className="my-1">
                                            Prénom de l'utilisateur
                                        </p>
                                        <input type="text" 
                                            onChange={(e) => setUserInfo({...userInfo,last_name:e.target.value})}
                                            value={userInfo?.last_name}
                                            className="border border-blue-500 rounded-[3px] outline-none py-1 w-full px-1"
                                            required
                                        />
                                    </div>

                                    <div className="input-container my-1">
                                        <p className="my-1">
                                            Matricule de l'utilisateur
                                        </p>
                                        <input type="text" 
                                            onChange={(e) => setUserInfo({...userInfo,matricule:e.target.value})}
                                            value={userInfo?.matricule}
                                            maxLength={4}
                                            className="border border-blue-500 rounded-[3px] outline-none py-1 w-full px-1"
                                            required
                                        />
                                    </div>

                                    <div className="input-container my-1">
                                        <p className="my-1">
                                            Pseudo de l'utilisateur
                                        </p>
                                        <input type="text" 
                                            onChange={(e) => setUserInfo({...userInfo,username:e.target.value})}
                                            value={userInfo?.username}
                                            className="border border-blue-500 rounded-[3px] outline-none py-1 w-full px-1"
                                            required
                                        />
                                    </div>

                                    <div className="input-container my-1">
                                        <p className="my-1">
                                            Email de l'utilisateur
                                        </p>
                                        <input type="email" 
                                            onChange={(e) => setUserInfo({...userInfo,email:e.target.value})}
                                            value={userInfo?.email}
                                            className="border border-blue-500 rounded-[3px] outline-none py-1 w-full px-1"
                                            required
                                        />
                                    </div>

                                    <div className="input-container my-1">
                                        <p className="my-1">
                                            Téléphone de l'utilisateur
                                        </p>
                                        <input type="tel" 
                                            onChange={(e) => setUserInfo({...userInfo,telephone:e.target.value})}
                                            value={userInfo?.telephone || ""}
                                            maxLength={10}
                                            className="border border-blue-500 rounded-[3px] outline-none py-1 w-full px-1"
                                            required
                                        />
                                    </div>

                                    <div className="input-container my-1">
                                        <p className="my-1">
                                            Direction
                                        </p>
                                        <select
                                            id="selection-direction"
                                            value={userInfo?.direction || ""}
                                            onChange={(e) => setUserInfo({...userInfo,direction:e.target.value})}
                                            className="border border-blue-500 rounded-[3px] outline-none py-1 w-full px-1"
                                            required
                                        >
                                            <option value="">Sélectionnez une direction</option>

                                            {directionList && directionList?.length > 0 &&
                                                directionList.map((direction:any,index:number) => (
                                                    <option key={index} value={direction.id}>
                                                        {direction.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    
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

"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { login } from '@/utils/handlerApi'



type FormType = {
  pseudo:string,
  password:string,
}

type MessageType = {
  text:string,
  type:string,
  invalid_username?:boolean,
  invalid_password?:boolean,
  isConnected?:boolean
}


export default function loginPage() {

  const router = useRouter()

  const [form, setForm] = useState<FormType>({ pseudo: "", password: "" })
  const [message, setMessage] = useState<MessageType>({text:"",type:"",invalid_username:false,invalid_password:false,isConnected:false})
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    setLoading(true)

    if (!loading) 
    {

      const response = await login(form)

      // Successfully
      if(response?.success) 
      {
        setMessage({
          ...message,
          type:"success",
          text:"Connexion réussie avec succes !",
          isConnected:true,
        })
        setTimeout(() => {
          router.push("/dashboard")
        },1000);
      }
      // Invalid username
      else if(!response?.success && response?.invalid_username) 
      {
        setMessage({
          ...message,
          type:"error",
          invalid_username:true,
          text:"Nom d'utilisateur incorrect !"
        })
        setForm({...form,pseudo:"",password:""})
        setLoading(false)
        setTimeout(() => {
          setMessage({
            ...message,text:"",
            invalid_username:false,
            invalid_password:false
          })
        },2000);

      }
      // Invalid password
      else if(!response?.success && response?.invalid_password)
      {
        setMessage({
          ...message,
          type:"error",
          invalid_password:true,
          text:"Mot de passe incorrect !"
        })
        setForm({...form,password:""})
        setLoading(false)
        setTimeout(() => {
          setMessage({
            ...message,
            text:"",
            invalid_username:false,
            invalid_password:false
          })
        },2000);
      }
      // Server error
      else
      {
        setLoading(false)
        setMessage({
          ...message,
          type:"error",
          invalid_password:true,
          text:"Désolé, le serveur a rencontré un problème !"
        })
        setTimeout(() => {
          setMessage({
            ...message,
            text:"",
            invalid_username:false,
            invalid_password:false
          })
          setForm({...form,pseudo:"",password:""})
        },2000);
      }
        
    }


  }


  return (
    <div className="flex justify-center items-center h-screen p-4" style={{background:"linear-gradient(37deg, rgb(35 147 195 / 95%), #00000003), url('/images/meeting-background.jpg') center/cover no-repeat"}}>

      {/* <div className="left-wrapper w-full hidden lg:flex pb-8" style={{ background: "url('/images/meeting-background.jpg') center/contain no-repeat" }} >
        <div className="px-3 py-2 self-end w-full">
          <h3 className="text-white font-medium text-xl text-center">
            Réservez votre salle de réunion en toute simplicité et rapidité !
          </h3>
        </div>
      </div> */}

      <div className="wrapper w-full max-w-[450px]">

        <h1 className="font-medium text-center text-[#ffffff] text-3xl my-4 select-none">Se connecter</h1>

        <form onSubmit={(e) => handleSubmit(e)}
          className="form-wrapper rounded-[10px] bg-[#ffffff] p-9 w-full"
          style={{ boxShadow: "0px 0px 4px gray" }}
        >

          <div className="mb-8">
            <img src='/images/meeting-logo-1.png' width={100} height={100} className="block mx-auto" />
          </div>

          <div className="input-container my-2">
            <label htmlFor="pseudo" className="text-[#5b9bb7] font-medium my-1 block">Nom utilisateur</label>
            <input type="text" placeholder="example: username123" name="pseudo" id="pseudo"
              className="border-[2px] border-[#82c7e4] text-blue-400 focus:border-blue-400 focus:shadow-md outline-none rounded-[3px] py-[7px] px-2 w-full text-[17px]"
              onChange={(e) => setForm({ ...form, pseudo: e.target.value })}
              value={form.pseudo}
              required
            />

            {message.invalid_username && 
              <p className={`font-medium ${message.type == "success" ? "text-green-500 " : "text-red-500"} my-2`}>
                {message.text} 
              </p> 
            }
          </div>

          <div className="input-container my-2">
            <label htmlFor="password" className="text-[#5b9bb7] font-medium my-1 block">Mot de passe</label>
            <input type="password" placeholder="example: password123" name="password" id="password"
              className="w-full text-blue-400 text-[17px] border-[2px] border-[#82c7e4] focus:border-blue-400 focus:shadow-md outline-none rounded-[3px] py-[7px] px-2"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}
              required
            />
            {message.invalid_password && 
              <p className={`font-medium ${message.type == "success" ? "text-green-500 " : "text-red-500"} my-2`}>
                {message.text}
              </p> 
            }
          </div>

          <div className="text-right">
            <Link href={""} className="text-red-500 font-medium">Mot de passe oublié !</Link>
          </div>

          <div className="button-container text-center mt-8 mb-2">
            <button
              type="submit"
              disabled={loading}
              className={`${loading ? "bg-gray-700" : "bg-blue-600 hover:bg-blue-700 hover:active:bg-gradient-to-r hover:active:from-blue-500 hover:active:to-blue-600"} transition-colors duration-100 rounded-[30px] py-[10px] px-3 w-full text-white font-medium`}
            >
              {loading ? 
                <span className="spinner block mx-auto border-2 border-r-transparent w-[24px] h-[24px] rounded-full"></span> 
              : 
                "Se connecter" 
              }
            </button>
          </div>

          <div className="button-container text-center mt-3">
            <button
              type="button"
              onClick={() => router.push("/home")}
              className="bg-red-600 hover:bg-red-700 hover:active:bg-gradient-to-r hover:active:from-red-500 hover:active:to-red-600 transition-colors duration-100 rounded-[30px] py-[10px] px-3 w-full text-white font-medium"
            >
              Fermer la session
            </button>
          </div>

        </form>
      </div>

    </div>
  )

}

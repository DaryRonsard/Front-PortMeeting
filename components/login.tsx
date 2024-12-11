"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { login } from '@/utils/fetchApi'



type FormType = {
  pseudo:string,
  password:string,
}


export default function loginPage() {

  const router = useRouter()

  const [form, setForm] = useState<FormType>({ pseudo: "", password: "" })
  const [message, setMessage] = useState<{text:string,type:string}>({text:"",type:""})
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    setLoading(true)

    if (!loading) {

      const result = await login(form)

      if (result?.success) 
      {
        setMessage({...message,type:"success",text:result.message})
        setTimeout(() => {
          router.push("/dashboard")
          setLoading(false)
        }, 1500);
      }
      else 
      {
        setMessage({...message,type:"error",text:result.message})
        setForm({...form,pseudo:"",password:""})
        setLoading(false)
        setTimeout(() => {
          setMessage({...message,text:""})
        },2000);
      }


    }


  }


  return (
    <div className="flex min-h-screen bg-[#1c3e6d]">

      <div className="left-wrapper w-full hidden lg:flex" style={{ background: "url('/images/meeting-background.jpg') center/contain no-repeat" }} >
        <div className="px-3 py-2 self-end w-full">
          <h3 className="text-white font-medium text-xl text-center mb-3">
            Réservez votre salle de réunion en toute simplicité et rapidité !
          </h3>
        </div>
      </div>

      <div className="right-wrapper flex justify-center items-center flex-col w-full bg-[#ffffff] p-5">

        <div className="wrapper w-full max-w-[450px]">

          <h1 className="font-medium text-center text-[#2c5da2] text-3xl my-4 select-none">Se connecter</h1>

          {message.type != ""  && 
            <p className={`text-center ${message.type == "success" ? "text-green-500 " : "text-red-500"} font-medium text-lg my-2`}>
              {message.text}
            </p> 
          }

          <form onSubmit={(e) => handleSubmit(e)}
            className="form-wrapper rounded-[10px] bg-[#2c5da2] p-9 w-full"
            style={{ boxShadow: "0px 0px 5px black" }}
          >

            <div className="mb-8">
              <img src='/images/meeting-logo-1.png' width={100} height={100} className="block mx-auto" />
            </div>

            <div className="input-container my-2">
              <label htmlFor="pseudo" className="text-white my-1 block">Nom utilisateur</label>
              <input type="text" placeholder="username123" name="pseudo" id="pseudo"
                className="border-[2px] border-gray-400 outline-none rounded-[3px] py-[5px] px-2 w-full"
                onChange={(e) => setForm({ ...form, pseudo: e.target.value })}
                value={form.pseudo}
                required
              />
            </div>

            <div className="input-container my-2">
              <label htmlFor="password" className="text-white my-1 block">Mot de passe</label>
              <input type="password" placeholder="password" name="password" id="password"
                className="border-[2px] border-gray-400 outline-none rounded-[3px] py-[5px] px-2 w-full"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                value={form.password}
                required
              />
            </div>

            <div>
              <Link href={""} className="text-yellow-500 ml-auto text-right block w-[180px] font-medium">Mot de passe oublié !</Link>
            </div>

            <div className="button-container text-center mt-8 mb-2">
              <button
                type="submit"
                className="bg-green-600 active:bg-green-700 rounded-[3px] py-[10px] px-3 w-full text-white font-medium"
              >
                {loading ? "Connexion en cours ..." : "Se connecter"}
                {/* Se connecter */}
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  )

}

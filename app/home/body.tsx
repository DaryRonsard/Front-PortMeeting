"use client"


import { useRouter } from 'next/navigation'
import React from 'react'

export default function Body() {

  const router = useRouter()

  return (
    <section className="mt-9 mb-3">

      <div className="bg-gradient-to-b from-[#ddeef5] to-gray-100 p-8 rounded-xl drop-shadow-md mb-3 w-full max-w-[1100px] mx-auto">

        <div className="flex items-center justify-center mb-3">
          <img src="/images/meeting-logo-1.png" alt="logo" width={75} className=""/>
          <h3 className="text-center font-medium text-2xl text-blue-500 uppercase"
            style={{textShadow:"0px 0px 2px blue"}}
          >
            Metting
          </h3>
        </div>

        <h3 className="text-center font-medium text-2xl text-blue-500" style={{textShadow:"0px 0px 1px blue"}}>Bienvenue sur l'application de gestion de salles de réunion</h3>
        
        {/* <p className="text-center font-semibold mt-5 mb-2 text-lg">Désormais, vous avez la possibilité de réserver vos salles de réunion et équipements en toute rapidité et simplicité !</p> */}
        
        <p className="text-center font-semibold mt-5 mb-2 text-lg">Réservez votre salle de réunion et vos équipements de travail en toute rapidité et simplicité !</p>

        <div className="my-4 text-center">
          <button onClick={() => router.push("/login")} type="button" 
            className="py-[10px] px-5 rounded-[8px] text-white bg-blue-500 hover:bg-blue-600 hover:text-white shadow-md"
          >
            Ouvrir ma session
          </button>
        </div>

      </div>

      <div className="bg-gradient-to-b from-[#ddeef5] to-gray-100 p-5 rounded-xl drop-shadow-md w-full max-w-[1300px] mx-auto">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem unde, aliquid molestias rerum, nihil eum corporis fuga sapiente atque nemo commodi. Ullam doloremque a accusantium! Possimus asperiores impedit autem earum! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci ipsum minus esse soluta ex sequi odio voluptatum. Fugiat aperiam autem mollitia libero corrupti aliquid sapiente consectetur architecto quidem voluptatum. Nostrum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure omnis tempore provident officiis aperiam expedita assumenda mollitia tenetur rerum quaerat in eligendi non harum modi, dolore totam, alias temporibus. Corrupti.
        Assumenda magni ipsum ratione dolor quis nobis dolore impedit. Atque officia rem et fugit neque consequatur esse accusamus nulla labore autem repellendus adipisci asperiores, perferendis amet eligendi placeat numquam temporibus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus aliquid, perferendis minus libero culpa dicta beatae quisquam nostrum voluptates consectetur minima maiores, quaerat possimus quo vero alias tempore repudiandae maxime!
        Assumenda voluptates ab, cupiditate placeat mollitia necessitatibus voluptatum. Inventore temporibus nesciunt fuga, ullam laboriosam veritatis molestiae, repellat totam asperiores quaerat eaque quo necessitatibus aliquid ipsa deleniti eos quae enim cupiditate.
        Amet, dicta porro. Eligendi dolore non dolores qui ipsam vitae adipisci et sunt rerum distinctio doloremque facilis, ullam commodi culpa quia, harum repudiandae iusto ex omnis fuga sed consectetur aspernatur.
        Quae reprehenderit voluptas eum maxime doloremque, numquam error quidem perspiciatis optio alias, sed rem illo et repudiandae deserunt voluptatibus quia sequi beatae! Quos, atque commodi perferendis obcaecati laudantium aliquid praesentium.
        Sint laborum commodi natus temporibus, excepturi ipsam? Ipsa est eum nostrum corporis dicta repellendus, fugiat mollitia perspiciatis sequi. Aliquid animi saepe ad labore dicta aliquam adipisci itaque nam excepturi earum.
        Ratione quae dicta non amet accusamus distinctio rerum in a beatae aperiam similique mollitia ab voluptatum ullam delectus rem magnam porro iure provident fugit, optio numquam! Non fugiat nemo odit.
        Obcaecati voluptatem a deleniti quis laboriosam facere architecto, vel accusamus repudiandae quos ducimus cupiditate culpa? Distinctio, minus molestias exercitationem, ipsum voluptas tempore in quasi vero fugit, vitae pariatur aliquid iste.
        Reprehenderit exercitationem iste aliquam iure, eum provident asperiores architecto repellendus quis modi mollitia dolorum non unde, illo quasi eaque totam? Ea, aspernatur nihil. Nobis doloribus facere nostrum obcaecati accusantium! Repudiandae.</p>
      </div>

    </section> 
  )
}

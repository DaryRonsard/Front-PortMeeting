"use client"

import React from 'react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex justify-center items-center p-5">
      <div className="flex flex-col gap-y-5">
        <h3 className="text-center font-medium text-blue-500 uppercase text-lg">401 | page Unauthorized</h3>
        <button
          onClick={() => history.back()}
          className={`bg-blue-600 hover:bg-blue-700 hover:active:bg-gradient-to-r hover:active:from-blue-500 hover:active:to-blue-600transition-colors duration-100 rounded-[30px] py-[10px] px-3 w-full text-white font-medium`}
        >
          Retour en arrière
        </button>
      </div>
    </div>
  )
}

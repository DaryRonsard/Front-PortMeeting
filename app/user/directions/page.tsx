
import React from 'react'
import SideBar from '@/components/user/sidebar'
import Body from './body'
import apiClient from '@/utils/api-client'
import axios from 'axios'

export default async function Directions() {

  // const response = await apiClient.get(`http://localhost:8000/directions/`)
  // const response = await axios.get(`http://localhost:8000/directions/`,{withCredentials:true})
  // const response = await axios.get(`http://localhost:8000/directions/`,{headers:{Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2Njc3NjQ3LCJpYXQiOjE3MzY2MjYyNjQsImp0aSI6IjY4NjNhNGJjYjY4MDRmNDVhMGYxNzgyMGYyOGE0ZjE3IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhYmlidWFsaTA5Iiwicm9sZSI6InN1cGVyX2FkbWluIiwiZGlyZWN0aW9uIjoiTm9uZSIsImVtYWlsIjoiYWJpYnVhbGkwOUBnbWFpbC5jb20ifQ.ul0zcRaDJYURjfip6JRZcJDehYhrLhC8_GXvCt_AZ6Y"}})
  // const directionsList = response.data?.length > 0 ? response.data : []
  // console.log(directionsList);

  return (
    <>
      <main className="min-h-screen pt-[20px] pr-5 pb-3 bg-[#f8f8f6]">
        <Body/>
      </main>
    </>
  )
}

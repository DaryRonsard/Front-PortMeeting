import Sidebar from '@/components/user/sidebar';
import { jwtDecode } from 'jwt-decode';
import type { Metadata } from "next";
import { cookies } from 'next/headers';
import { ToastContainer } from 'react-toastify';


export const metadata: Metadata = {
  title: "Directions",
  description: "Gestion des salles de réunion",
};

export default async function DirectionsLayout({ children }: { children: React.ReactNode }) {

  const cookie:any = await cookies()
  const decode:any = cookie?.get("access_token")?.value ? await jwtDecode(cookie?.get("access_token")?.value) : null
  
  const  username = decode ? decode?.username : null
  const  email = decode ? decode?.email : null
  // console.log(decode);

  return (
    <div className="app">
      <Sidebar username={username} email={email}/>
      <ToastContainer/>
      {children}
    </div>
  );
}

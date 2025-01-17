import Sidebar from '@/components/user/sidebar';
import { jwtDecode } from 'jwt-decode';
import type { Metadata } from "next";
import { cookies } from 'next/headers';


export const metadata: Metadata = {
    title: "Dashboard",
    description: "Gestion des salles de réunion",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const cookie:any = await cookies()
  const decode:any = jwtDecode(cookie?.get("access_token")?.value)
  const  username = decode?.username
  const  email = decode?.email
  // console.log(decode);

  return (
    <div className="app">
      <Sidebar username={username} email={email} />
      {children}
    </div>
  );
}

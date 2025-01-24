import Sidebar from '@/components/admin/sidebar';
import LeftSideBar from '@/components/global_sidebar';
import { jwtDecode } from 'jwt-decode';
import type { Metadata } from "next";
import { cookies } from 'next/headers';


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Gestion des salles de réunion",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const cookie:any = await cookies()
  const decode:any = cookie?.get("access_token")?.value ? jwtDecode(cookie?.get("access_token")?.value) : null
  const  username = decode?.username || null
  const  user_role = decode?.role || null
  const  email = decode?.email || null
  const  user_profil = decode?.avatar || null
  const  last_name = decode?.last_name || null
  const  first_name = decode?.first_name || null

    
  return (
    <div className="app">
      <LeftSideBar 
        user_role={user_role}
        username={username}
        email={email}
        first_name={first_name}
        last_name={last_name}
        user_profil={user_profil}
      />
      {children}
    </div>
  );
}

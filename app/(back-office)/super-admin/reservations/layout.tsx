import Sidebar from '@/components/admin/sidebar';
import type { Metadata } from "next";
import { ToastContainer } from 'react-toastify';


export const metadata: Metadata = {
    title: "Dashboard",
    description: "Gestion des salles de réunion",
};

export default function ReservationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app">
      <Sidebar />
      <ToastContainer/>
      {children}
    </div>
  );
}

import Sidebar from '@/components/super-admin/sidebar';
import type { Metadata } from "next";
import { ToastContainer } from 'react-toastify';


export const metadata: Metadata = {
  title: "Directions",
  description: "Gestion des salles de réunion",
};

export default function DirectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app">
      <Sidebar />
      <ToastContainer/>
      {children}
    </div>
  );
}

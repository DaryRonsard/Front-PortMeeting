import Sidebar from '@/components/user/sidebar';
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Directions",
    description: "Gestion des salles de réunion",
};

export default function DirectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app">
      <Sidebar />
      {children}
    </div>
  );
}

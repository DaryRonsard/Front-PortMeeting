import LeftSideBar from '@/components/global_sidebar';
import Sidebar from '@/components/super-admin/sidebar';
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Salles",
    description: "Gestion des salles de réunion",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app">
      <LeftSideBar user_role="super_admin" />
      {children}
    </div>
  );
}

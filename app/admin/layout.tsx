import { ReactNode } from 'react';
import { AdminNavbar } from '@/components/admin-navbar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function AdminLayout({
  children,
}: {
  children: ReactNode,
}) {
  return <SidebarProvider>
    <AdminNavbar />
    <div className="w-full ">
      <div className="w-full h-fit p-3">
        <SidebarTrigger iconClassName="size-6 text-muted-foreground" />
      </div>
      {children}
    </div>
  </SidebarProvider>;
}
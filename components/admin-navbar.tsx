'use client';

import * as React from "react"
import {
  Users, Image
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { AdminNavItems } from '@/components/admin-nav-items';

const data = {
  nav: [
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Liste",
          url: "/admin/users",
        },
      ],
    },
    {
      title: "Capsules",
      url: "/admin/capsules",
      icon: Image,
      items: [
        {
          title: "Liste",
          url: "/admin/capsules",
        },
      ],
    },
  ],
}

export const AdminNavbar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <AdminNavItems items={data.nav} />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

"use client";

import * as React from "react";
import {
  DollarSignIcon,
  LayoutDashboard,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  user: {
    name: "Template",
    email: "templatet@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Template",
      logo: LayoutDashboard,
      plan: "Template design",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Amount",
      url: "#",
      icon: DollarSignIcon,
      isActive: true,
      items: [
        {
          title: "Set Donation",
          url: "/dashboard/set-amount",
        },
      ],
    },
    {
      title: "Donation",
      url: "#",
      icon: DollarSignIcon,
      isActive: true,
      items: [
        {
          title: "Add Donation",
          url: "/dashboard/add-donation",
        },
      ],
    },
  
  ],

};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { html, View } from "@tamagui/tailwind"
import {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
  CameraIcon,
  FileTextIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
  DatabaseIcon,
  FileChartColumnIcon,
  FileIcon,
  CommandIcon,
} from "@/components/icons"
import { isWeb } from "tamagui"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: <LayoutDashboardIcon stroke={isWeb ? "currentColor" : undefined} />,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: <ListIcon stroke={isWeb ? "currentColor" : undefined} />,
    },
    {
      title: "Analytics",
      url: "#",
      icon: <ChartBarIcon stroke={isWeb ? "currentColor" : undefined} />,
    },
    {
      title: "Projects",
      url: "#",
      icon: <FolderIcon stroke={isWeb ? "currentColor" : undefined} />,
    },
    {
      title: "Team",
      url: "#",
      icon: <UsersIcon stroke={isWeb ? "currentColor" : undefined} />,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: <CameraIcon stroke={isWeb ? "currentColor" : undefined} />,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: <FileTextIcon stroke={isWeb ? "currentColor" : undefined} />,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: <FileTextIcon stroke={isWeb ? "currentColor" : undefined} />,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon stroke={isWeb ? "currentColor" : undefined} />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <CircleHelpIcon stroke={isWeb ? "currentColor" : undefined} />,
    },
    {
      title: "Search",
      url: "#",
      icon: <SearchIcon stroke={isWeb ? "currentColor" : undefined} />,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: <DatabaseIcon stroke={isWeb ? "currentColor" : undefined} />,
    },
    {
      name: "Reports",
      url: "#",
      icon: <FileChartColumnIcon stroke={isWeb ? "currentColor" : undefined} />,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: <FileIcon stroke={isWeb ? "currentColor" : undefined} />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <html.a href="#">
                <View asChild className="size-5!">
                  <CommandIcon stroke={isWeb ? "currentColor" : undefined} />
                </View>
                <html.span className="text-base font-semibold">
                  Acme Inc.
                </html.span>
              </html.a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

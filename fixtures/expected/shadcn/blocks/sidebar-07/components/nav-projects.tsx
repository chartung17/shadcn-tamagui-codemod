"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { html, View } from "@tamagui/tailwind"
import {
  MoreHorizontalIcon,
  FolderIcon,
  ArrowRightIcon,
  Trash2Icon,
} from "@/components/icons"
import { isWeb } from "tamagui"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: React.ReactNode
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden!">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <html.a href={item.url}>
                {item.icon}
                <html.span>{item.name}</html.span>
              </html.a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="aria-expanded:bg-(--muted)!"
                >
                  <MoreHorizontalIcon
                    stroke={isWeb ? "currentColor" : undefined}
                  />
                  <html.span className="sr-only">More</html.span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-fit"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <FolderIcon stroke={isWeb ? "currentColor" : undefined} />
                  <html.span>View Project</html.span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowRightIcon stroke={isWeb ? "currentColor" : undefined} />
                  <html.span>Share Project</html.span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2Icon stroke={isWeb ? "currentColor" : undefined} />
                  <html.span>Delete Project</html.span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <View asChild className="text-sidebar-foreground/70">
              <MoreHorizontalIcon stroke={isWeb ? "currentColor" : undefined} />
            </View>
            <html.span>More</html.span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

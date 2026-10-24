import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { html, View } from "@tamagui/tailwind"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <html.header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <View className="flex flex-row items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </View>
        </html.header>
        <View className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <html.div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <html.div className="aspect-video rounded-xl bg-muted/50" />
            <html.div className="aspect-video rounded-xl bg-muted/50" />
            <html.div className="aspect-video rounded-xl bg-muted/50" />
          </html.div>
          <html.div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </View>
      </SidebarInset>
    </SidebarProvider>
  )
}

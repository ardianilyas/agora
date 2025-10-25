import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

type Props = {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-lg font-semibold">Dashboard Agora</h1>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4">
          <div className="min-w-0 space-y-4">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
import { SquareTerminal, Settings, Users } from "lucide-react";

export const sidebarMenus = {
  USER: [
    {
      title: "Tickets",
      url: "/dashboard/tickets",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "My Tickets", url: "/dashboard/tickets" },
        { title: "Create Tickets", url: "/dashboard/tickets/create" },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],

  ADMIN: [
    {
      title: "Tickets Management",
      url: "/dashboard/tickets",
      icon: SquareTerminal,
      items: [
        { title: "Your Tickets", url: "/dashboard/tickets" },
        { title: "All Tickets", url: "/dashboard/admin/tickets" },
        { title: "Open Tickets", url: "/dashboard/admin/tickets/open" },
        { title: "Closed Tickets", url: "/dashboard/admin/tickets/closed" },
      ],
    },
    {
      title: "User Management",
      url: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
}
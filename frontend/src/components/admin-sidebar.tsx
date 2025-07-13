"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Building2,
  ChevronUp,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: FolderTree,
  },
  {
    title: "Suppliers",
    url: "/admin/suppliers",
    icon: Building2,
  },
];

interface AdminSidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
  open?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ activeItem = "products", open = false, onClose }: AdminSidebarProps) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleMenuClick = (item: string) => {
    if (item === "dashboard") navigate("/admin/dashboard");
    else if (item === "products") navigate("/admin/products");
    else if (item === "categories") navigate("/admin/categories");
    else if (item === "suppliers") navigate("/admin/suppliers");
  };

  return (
    <>
      {/* Mobile overlay and sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity md:hidden ${open ? "block" : "hidden"}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`h-full w-64 bg-white shadow-lg transition-transform duration-200
          fixed z-50 top-0 left-0 md:static md:z-auto md:shadow-none
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          md:block md:fixed md:top-0 md:left-0 md:h-screen md:w-64`}
        style={{ maxWidth: "100vw" }}
      >
        {/* Sidebar content */}
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Package className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Admin Panel</span>
                <span className="text-xs text-muted-foreground">ProductStore</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={activeItem === item.title.toLowerCase()}
                        onClick={() => handleMenuClick(item.title.toLowerCase())}
                      >
                        <button className="flex items-center gap-2 w-full">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <div className="flex items-center justify-between w-full px-4 py-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium">{user?.username || "Admin User"}</span>
                  <span className="text-xs text-muted-foreground">{user?.email || "admin@example.com"}</span>
                </div>
              </div>
              <button onClick={handleLogout} className="ml-4 p-2 rounded hover:bg-muted transition-colors">
                <LogOut className="h-5 w-5 text-destructive" />
              </button>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
      </aside>
    </>
  );
}

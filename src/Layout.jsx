// import { Link, useLocation } from "react-router-dom";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useState } from "react";
// import { createPageUrl } from "@/utils";
import { createPageUrl } from "./utils/createPageUrl";
import { 
  Home, 
  Sprout, 
  CloudRain, 
  Users, 
  BookOpen, 
  User,
  Leaf,
  Menu,
  X
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
  },
  {
    title: "Crop Recommendations",
    url: createPageUrl("Recommendations"),
    icon: Sprout,
  },
  {
    title: "Weather Insights",
    url: createPageUrl("Weather"),
    icon: CloudRain,
  },
  {
    title: "Community Forum",
    url: createPageUrl("Forum"),
    icon: Users,
  },
  {
    title: "Resources",
    url: createPageUrl("Resources"),
    icon: BookOpen,
  },
  {
    title: "Farm Profile",
    url: createPageUrl("Profile"),
    icon: User,
  },
];

// export default function Layout({ children, currentPageName }) {
export default function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <SidebarProvider>
        <div className="flex w-full">
          <Sidebar className="border-r border-green-100 bg-white/80 backdrop-blur-sm">
            <SidebarHeader className="border-b border-green-100 p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-xl text-gray-900">FarmWise</h2>
                  <p className="text-sm text-green-600">Climate-Smart Farming</p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent className="p-3">
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                  Navigation
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navigationItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`hover:bg-green-50 hover:text-green-700 transition-all duration-200 rounded-xl mb-1 ${
                            location.pathname === item.url 
                              ? 'bg-green-100 text-green-700 shadow-sm' 
                              : 'text-gray-600'
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-green-100 p-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white">
                <h3 className="font-semibold text-sm mb-1">Need Help?</h3>
                <p className="text-xs opacity-90 mb-3">
                  Connect with agricultural experts and fellow farmers
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                  asChild
                >
                  <Link to={createPageUrl("Forum")}>
                    Join Community
                  </Link>
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>

          <main className="flex-1 md-w-3/4 lg:w-2/3 xl:w-1/2 p-6">
            {/* Mobile Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 px-4 py-3 md:hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SidebarTrigger className="hover:bg-green-50 p-2 rounded-lg transition-colors duration-200" />
                  <div className="flex items-center gap-2">
                    <Leaf className="w-6 h-6 text-green-600" />
                    <h1 className="text-lg font-bold text-gray-900">FarmWise</h1>
                  </div>
                </div>
              </div>
            </header>

            {/* Main content */}
            <div className="flex-1">
              <Outlet />
              {/* {children} */}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
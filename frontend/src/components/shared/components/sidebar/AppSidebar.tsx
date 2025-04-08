import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
    BarChart2,
    Settings,
    LogOut,
    Layers,
    BookCheck,
    House,
    PanelRightClose,
    PanelRightOpen,
} from "lucide-react";

import {
    Sidebar,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
    className?: string;
}

/**
 * Application sidebar component that includes navigation and logout functionality
 */
export function AppSidebar({ className }: AppSidebarProps) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { state, toggleSidebar } = useSidebar();
    const isCollapsed = state === "collapsed";

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    // Define navigation items with icons
    const navItems = [
        { icon: House, name: "Home", path: "/home" },
        { icon: Layers, name: "Categories", path: "/categories" },
        { icon: BookCheck, name: "Quizzes", path: "/quizzes" },
        { icon: BarChart2, name: "Reports", path: "/reports" },
        { icon: Settings, name: "Settings", path: "/settings" },
    ];

    // Check if a path is active (exact match or starts with the path)
    const isActiveRoute = (path: string) => {
        return (
            location.pathname === path ||
            (path !== "/home" && location.pathname.startsWith(path))
        );
    };

    return (
        <>
            {/* Sidebar - hidden on mobile screens */}
            <div className="hidden md:block">
                <Sidebar
                    collapsible="icon"
                    variant="inset"
                    className={`h-[calc(100vh-64px)] mt-16 ${className}`}
                >
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {navItems.map((item) => {
                                        const isActive = isActiveRoute(item.path);
                                        return (
                                            <SidebarMenuItem key={item.path}>
                                                <SidebarMenuButton
                                                    asChild
                                                    tooltip={item.name}
                                                >
                                                    <NavLink
                                                        to={item.path}
                                                        className={cn(
                                                            "flex items-center gap-3 px-4 py-6 text-[15px] rounded-md transition-colors",
                                                            isActive
                                                                ? "bg-cyan-400/10 font-semibold text-cyan-600 hover:bg-cyan-400/20 hover:text-cyan-700"
                                                                : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-700"
                                                        )}
                                                    >
                                                        <item.icon
                                                            className={cn(
                                                                "h-6 w-6 transition-colors",
                                                                isActive
                                                                    ? "text-cyan-600 group-hover:text-cyan-700"
                                                                    : "text-slate-500 group-hover:text-slate-600"
                                                            )}
                                                        />
                                                        <span>{item.name}</span>
                                                    </NavLink>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {/* Logout button */}
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 py-6 px-4 text-[15px] cursor-pointer text-red-500 hover:text-red-600 transition-colors"
                                            tooltip="Logout"
                                        >
                                            <LogOut className="h-5 w-5 transition-colors text-red-500 hover:text-red-600" />
                                            <span>Logout</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        {/* Optimized sidebar trigger button */}
                        <SidebarMenu className="mt-auto border-t py-2 px-3">
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={toggleSidebar}
                                    tooltip={
                                        isCollapsed
                                            ? "Expand sidebar"
                                            : "Collapse sidebar"
                                    }
                                    className={cn(
                                        "flex items-center gap-3 py-2.5 text-[15px] hover:bg-slate-100/80 hover:text-slate-700"
                                    )}
                                >
                                    {isCollapsed ? (
                                        <PanelRightClose className="h-6 w-6 transition-colors text-slate-600 hover:text-slate-700" />
                                    ) : (
                                        <>
                                            <PanelRightOpen className="h-6 w-6 transition-colors text-slate-600 hover:text-slate-700" />
                                            <span className="text-slate-600 hover:bg-slate-100/80 hover:text-slate-700">
                                                Collapse
                                            </span>
                                        </>
                                    )}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </div>
                </Sidebar>
            </div>
        </>
    );
}

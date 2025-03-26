// src/layouts/HomeLayout.tsx
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
    BarChart2,
    Settings,
    LogOut,
    Layers,
    BookCheck,
    House,
} from "lucide-react";

const HomeLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

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

    return (
        <div className="flex bg-gray-100 min-h-[calc(100vh-70px)]">
            {/* Sidebar for desktop */}
            <aside className="bg-white text-white w-64 flex-shrink-0 transition-all duration-300 fixed inset-y-0 left-0 z-20 md:relative md:translate-x-0">
                {/* Nav links */}
                <nav className="p-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-3 p-3 rounded-md hover:bg-gray-100 transition-colors ${
                                            isActive
                                                ? "bg-gray-100 font-semibold text-indigo-700"
                                                : "text-gray-500 font-medium"
                                        }`
                                    }
                                >
                                    <item.icon size={18} />
                                    <span>{item.name}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Logout button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 p-3 rounded-md hover:text-red-600 hover:bg-gray-100 hover:cursor-pointer transition-colors w-full mt-8 text-gray-500"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default HomeLayout;

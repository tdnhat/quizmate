import Navbar from "@/components/shared/components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
    const location = useLocation();
    const isHomePath = location.pathname.startsWith('/home') || 
                      location.pathname.startsWith('/categories') || 
                      location.pathname.startsWith('/quizzes') || 
                      location.pathname.startsWith('/reports') || 
                      location.pathname.startsWith('/settings');

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar className="fixed top-0 left-0 right-0 z-50" />
            <main className={`flex-grow ${isHomePath ? 'pt-16' : ''}`}>
                <Outlet />
            </main>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 2000,
                    style: {
                        background: "#ffffff", // light theme bg
                        color: "#1f2937", // dark gray text (Tailwind gray-800)
                    },
                    success: {
                        iconTheme: {
                            primary: "#0891b2", // cyan-600
                            secondary: "#e0f7fa", // light cyan-ish secondary (for contrast)
                        },
                    },
                }}
            />
        </div>
    );
};

export default MainLayout;

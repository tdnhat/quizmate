import Navbar from "@/components/shared/components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

const MainLayout = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [addPaddingTop, setAddPaddingTop] = useState(true);
    const location = useLocation();
    const isHomePath =
        location.pathname.startsWith("/home") ||
        location.pathname.startsWith("/categories") ||
        location.pathname.startsWith("/quizzes") ||
        location.pathname.startsWith("/library") ||
        location.pathname.startsWith("/settings");

    useEffect(() => {
        if (!mobileMenuOpen) {
            // Delay adding pt-16 until after transition finishes (500ms)
            const timeout = setTimeout(() => {
                setAddPaddingTop(true);
            }, 500);
            return () => clearTimeout(timeout);
        } else {
            // Remove padding immediately when menu opens
            setAddPaddingTop(false);
        }
    }, [mobileMenuOpen]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar
                isMobileMenuOpen={mobileMenuOpen}
                onMobileMenuOpen={setMobileMenuOpen}
                className="fixed top-0 left-0 right-0 z-50"
            />
            <main
                className={`flex-grow transition-all duration-500 ${
                    isHomePath && addPaddingTop ? "pt-16" : ""
                }`}
            >
                <Outlet />
            </main>
            <Toaster
                position="top-center"
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

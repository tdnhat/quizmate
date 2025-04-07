import Navbar from "@/components/shared/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
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

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
                position="top-right"
                toastOptions={{
                    duration: 2000,
                    style: {
                        background: "#363636",
                        color: "#fff",
                    },
                    success: {
                        iconTheme: {
                            primary: "#10B981",
                            secondary: "#FFFFFF",
                        },
                    },
                }}
            />
        </div>
    );
};

export default MainLayout;

import Navbar from "@/components/shared/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    )
};

export default MainLayout;

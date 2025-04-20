// src/layouts/HomeLayout.tsx
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/components/sidebar/AppSidebar";
import { useState } from "react";

const SIDEBAR_STATE_KEY = "quizmate-sidebar-state";

const HomeLayout = () => {
    // Initialize state from localStorage
    const [open, setOpen] = useState(() => {
        try {
            const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
            return savedState !== null ? savedState === "open" : true;
        } catch (error) {
            console.error("Error accessing localStorage:", error);
            return true;
        }
    });

    // Handle state changes
    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        try {
            localStorage.setItem(SIDEBAR_STATE_KEY, isOpen ? "open" : "closed");
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    };

    return (
        <SidebarProvider
            defaultOpen={open}
            open={open}
            onOpenChange={handleOpenChange}
        >
            <div className="flex bg-slate-50 min-h-screen w-full overflow-hidden">
                {/* Use the AppSidebar component */}
                <AppSidebar />

                {/* Main content area with padding to account for navbar and sidebar */}
                <div className="flex-1 flex flex-col w-full overflow-hidden">
                    {/* Page content */}
                    <main className="flex-1 overflow-y-auto p-4 bg-slate-50 w-full max-w-full">
                        <div className="mx-auto w-full max-w-7xl">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default HomeLayout;

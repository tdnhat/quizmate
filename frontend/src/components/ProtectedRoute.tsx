import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading, user } = useAuth();
    const location = useLocation();

    console.log("ProtectedRoute check:", {
        isAuthenticated,
        isLoading,
        user,
        path: location.pathname,
    });

    if (isLoading) {
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>;
    }

    if (!isAuthenticated) {
        console.log("Not authenticated, redirecting to login");
        return (
            <Navigate to="/login" state={{ from: location.pathname }} replace />
        );
    }

    console.log("Authentication verified, rendering protected content");
    return <Outlet />;
};

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
        console.log("Still loading auth status...");
        return <div>Loading...</div>;
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

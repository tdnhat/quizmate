import { useAuth } from "@/features/auth/hooks/useAuth";
import Loader from "@/components/shared/components/Loader";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate to="/login" state={{ from: location.pathname }} replace />
        );
    }

    return <Outlet />;
};

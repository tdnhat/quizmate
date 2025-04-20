import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import DotLoader from "@/components/shared/components/loaders/DotLoader";
import { useEffect, useState } from "react";

export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        // Only set redirect after loading is complete and user is not authenticated
        if (!isLoading && !isAuthenticated) {
            setTimeout(() => {
                setShouldRedirect(true);
            }, 1000);
        }
    }, [isLoading, isAuthenticated]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <DotLoader />
            </div>
        );
    }

    // Only redirect after we're sure the user is not authenticated
    if (shouldRedirect) {
        return (
            <Navigate to="/login" state={{ from: location.pathname }} replace />
        );
    }

    return <Outlet />;
};

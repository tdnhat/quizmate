import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginCard from "@/features/auth/components/login/LoginCard";

const LoginPage = () => {
    const location = useLocation();
    const [returnUrl, setReturnUrl] = useState<string | null>(null);

    useEffect(() => {
        // First check location state (used by ProtectedRoute)
        if (location.state?.from) {
            setReturnUrl(location.state.from);
            return;
        }

        // Then check URL parameters
        const searchParams = new URLSearchParams(location.search);
        const returnUrlParam = searchParams.get("returnUrl");

        if (returnUrlParam) {
            const decodedUrl = decodeURIComponent(returnUrlParam);
            setReturnUrl(decodedUrl);
        } else {
            const joinCode = searchParams.get("joinCode");
            if (joinCode) {
                const joinPath = `/join/${joinCode}`;
                setReturnUrl(joinPath);
            }
        }
    }, [location]);

    return <LoginCard returnUrl={returnUrl} />;
};

export default LoginPage;

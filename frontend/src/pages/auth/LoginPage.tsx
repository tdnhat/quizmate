import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginCard from "@/features/auth/components/login/LoginCard";

const LoginPage = () => {
    const location = useLocation();
    const [returnUrl, setReturnUrl] = useState<string | null>(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        // Try to get returnUrl first, then joinCode as fallback
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
    }, [location.search]);

    return <LoginCard returnUrl={returnUrl} />;
};

export default LoginPage;

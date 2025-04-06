import { useLocation } from "react-router-dom";
import LoginForm from "@/features/auth/components/login/LoginForm";
import { useEffect, useState } from "react";

const Login = () => {
    const location = useLocation();
    const [returnUrl, setReturnUrl] = useState<string | null>(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const url = decodeURIComponent(searchParams.get("returnUrl") || "");
        setReturnUrl(url);
    }, [location.search]);

    return <LoginForm returnUrl={returnUrl} />;
};

export default Login;

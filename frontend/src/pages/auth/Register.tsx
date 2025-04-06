import RegisterForm from "@/features/auth/components/register/RegisterForm";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Register = () => {
    const location = useLocation();
    const [returnUrl, setReturnUrl] = useState<string | null>(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        console.log(`[Register.tsx] Search params: ${location.search}`);
        
        // Try to get returnUrl first, then joinCode as fallback
        const returnUrlParam = searchParams.get("returnUrl");
        console.log(`[Register.tsx] returnUrlParam: ${returnUrlParam}`);
        
        if (returnUrlParam) {
            const decodedUrl = decodeURIComponent(returnUrlParam);
            console.log(`[Register.tsx] Setting returnUrl to: ${decodedUrl}`);
            setReturnUrl(decodedUrl);
        } else {
            const joinCode = searchParams.get("joinCode");
            console.log(`[Register.tsx] joinCode: ${joinCode}`);
            
            if (joinCode) {
                const joinPath = `/join/${joinCode}`;
                console.log(`[Register.tsx] Setting returnUrl to: ${joinPath}`);
                setReturnUrl(joinPath);
            }
        }
    }, [location.search]);

    return <RegisterForm returnUrl={returnUrl} />;
};

export default Register;

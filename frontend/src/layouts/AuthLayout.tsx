import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-cyan-50">
            <div className="w-full max-w-sm space-y-8">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;

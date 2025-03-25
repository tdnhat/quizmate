import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-cyan-50 py-12">
            <div className="w-full max-w-sm space-y-8">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;

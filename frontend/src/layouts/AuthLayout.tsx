import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="flex items-center justify-center bg-slate-50 min-h-screen w-full overflow-hidden">
            <div className="w-full max-w-sm space-y-8 my-20">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;

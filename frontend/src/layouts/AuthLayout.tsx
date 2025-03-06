import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <img
                        src="../../public/Logo.svg"
                        alt="Logo"
                        className="mx-auto h-12 w-auto"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Welcome to QuizMate
                    </h2>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;

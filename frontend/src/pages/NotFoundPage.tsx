import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50 px-4 py-12">
            <div className="max-w-lg w-full text-center">
                {/* 404 SVG Image */}
                <img
                    src="/not-found/404.svg"
                    alt="404 - Page Not Found"
                    className="w-full max-w-md mx-auto mb-8 drop-shadow-lg"
                />

                {/* Title and description */}
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Oops! Page not found
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    The page you are looking for might have been removed, had
                    its name changed, or is temporarily unavailable.
                </p>

                {/* Navigation buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-white text-cyan-600 font-medium cursor-pointer rounded-lg border border-cyan-600 hover:bg-gray-100 transition-colors"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate("/home")}
                        className="px-6 py-3 bg-cyan-600 text-white font-medium cursor-pointer rounded-lg hover:bg-cyan-700 transition-colors"
                    >
                        Go to Home
                    </button>
                </div>
            </div>

            {/* Additional help text */}
            <p className="mt-12 text-gray-500">
                If you think this is an error, please contact support.
            </p>
        </div>
    );
};

export default NotFoundPage;

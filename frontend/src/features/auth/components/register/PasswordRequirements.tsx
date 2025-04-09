import { PASSWORD_REQUIREMENTS } from "../../utils";

interface PasswordRequirementsProps {
    className?: string;
    password: string;
}

const PasswordRequirements = ({
    className = "",
    password,
}: PasswordRequirementsProps) => {
    return (
        <div className={`bg-blue-50 p-4 rounded-lg mt-2 ${className}`}>
            <div className="flex items-start gap-2">
                <svg
                    className="w-5 h-5 text-blue-500 mt-0.5"
                    fill="none"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <div>
                    <p className="font-medium text-sm mb-2">Passwords must:</p>
                    <ul className="space-y-1">
                        {PASSWORD_REQUIREMENTS.map((req, index) => {
                            const isMet = req.check(password);
                            return (
                                <li
                                    key={index}
                                    className={`flex items-center gap-2 text-sm ${
                                        isMet ? "text-green-600" : "text-gray-600"
                                    }`}
                                >
                                    {isMet ? (
                                        <svg
                                            className="w-4 h-4 text-green-500"
                                            fill="none"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-4 h-4 text-gray-400"
                                            fill="none"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 12h.01M12 12a1 1 0 0 1 0-2 1 1 0 0 1 0 2Z"
                                            />
                                        </svg>
                                    )}
                                    {req.text}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PasswordRequirements;

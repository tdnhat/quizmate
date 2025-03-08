import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface SectionHeaderProps {
    title: string;
    actionLink?: string;
    actionText?: string;
    icon?: ReactNode;
}

const SectionHeader = ({
    title,
    actionLink,
    actionText,
    icon,
}: SectionHeaderProps) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            {actionLink && actionText && (
                <Link
                    to={actionLink}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1"
                >
                    {actionText} {icon}
                </Link>
            )}
        </div>
    );
};

export default SectionHeader;

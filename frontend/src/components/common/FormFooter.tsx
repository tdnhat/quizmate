import { Link } from "react-router-dom";

interface FormFooterProps {
    text: string;
    linkText: string;
    linkTo: string;
}

export const FormFooter = ({ text, linkText, linkTo }: FormFooterProps) => {
    return (
        <div className="text-center text-sm">
            {text}{" "}
            <Link
                to={linkTo}
                className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
            >
                {linkText}
            </Link>
        </div>
    );
};

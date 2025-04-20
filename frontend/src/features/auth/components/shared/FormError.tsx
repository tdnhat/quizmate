interface FormErrorProps {
    message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null;

    return (
        <div
            className="bg-red-50 text-red-500 px-3 py-2 rounded-md text-sm"
            role="alert"
        >
            {message}
        </div>
    );
};

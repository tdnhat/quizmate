const Loader = () => {
    return (
        <div className="flex justify-center items-center mt-6">
            <div className="flex flex-row gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.1s]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-bounce"></div>
            </div>
        </div>
    );
};

export default Loader;

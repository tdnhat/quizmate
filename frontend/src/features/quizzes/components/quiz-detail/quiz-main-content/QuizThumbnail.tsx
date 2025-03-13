interface QuizThumbnailProps {
    thumbnail: string;
}

const QuizThumbnail = ({ thumbnail }: QuizThumbnailProps) => {
    return (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <img
                src={thumbnail}
                alt="Quiz Thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.parentElement!.classList.add(
                        "bg-gradient-to-r",
                        "from-purple-400",
                        "to-indigo-500"
                    );
                }}
            />
        </div>
    );
};

export default QuizThumbnail;

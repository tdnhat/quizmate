import { Star } from "lucide-react";

interface QuizRatingProps {
    rating: number;
    completions: number;
}

const QuizRating = ({ rating, completions }: QuizRatingProps) => {
    // Generate stars based on rating
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Star
                    key={`star-${i}`}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
            );
        }

        if (hasHalfStar) {
            stars.push(
                <div key="half-star" className="relative">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <Star
                        className="absolute top-0 left-0 w-5 h-5 fill-yellow-400 text-yellow-400 overflow-hidden"
                        style={{ clipPath: "inset(0 50% 0 0)" }}
                    />
                </div>
            );
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Star
                    key={`empty-star-${i}`}
                    className="w-5 h-5 text-gray-300"
                />
            );
        }

        return stars;
    };

    return (
        <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center">{renderStars()}</div>
            <span className="text-lg font-medium">{rating.toFixed(1)}</span>
            <span className="text-gray-500">
                ({completions.toLocaleString()} completions)
            </span>
        </div>
    );
};

export default QuizRating;

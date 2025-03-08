import { Star } from "lucide-react";

interface RatingDisplayProps {
    rating: number;
};

const RatingDisplay = ({ rating }: RatingDisplayProps) => {
    return (
        <div className="flex items-center">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-gray-600 ml-1">{rating}</span>
        </div>
    );
};

export default RatingDisplay;

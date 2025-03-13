import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuizAuthor } from "@/types/quiz";
import { Link } from "react-router-dom";

interface QuizAuthorInfoProps {
    author: QuizAuthor;
}

const QuizAuthorInfo = ({ author }: QuizAuthorInfoProps) => {
    return (
        <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
                Created by
            </h3>
            <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">{author.name}</p>
                    <Link
                        to={`/authors/${author.id}`}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        View profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default QuizAuthorInfo;

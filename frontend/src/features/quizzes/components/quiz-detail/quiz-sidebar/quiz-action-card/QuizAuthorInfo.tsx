import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";
import { Link } from "react-router-dom";

interface QuizAuthorInfoProps {
    author: User;
}

const QuizAuthorInfo = ({ author }: QuizAuthorInfoProps) => {
    return (
        <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
                Created by
            </h3>
            <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={author.avatarUrl} alt={author.username} />
                    <AvatarFallback>
                        {author.username.split("-")[0].charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">{author.username}</p>
                    <Link
                        to={`/authors/${author.username}`}
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

import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

interface QuizTagsListProps {
    tags: string[];
}

const QuizTagsList = ({ tags }: QuizTagsListProps) => {
    return (
        <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="font-normal">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                    </Badge>
                ))}
            </div>
        </div>
    );
};

export default QuizTagsList;

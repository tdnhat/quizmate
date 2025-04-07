import { Link } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Quiz } from "@/types/quiz";

interface QuizSessionBreadcrumbProps {
    quiz: Quiz;
}

const QuizSessionBreadcrumb = ({ quiz }: QuizSessionBreadcrumbProps) => {
    return (
        <Breadcrumb className="mb-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link
                        to="/home"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Home
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <Link
                        to="/quizzes"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Quizzes
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <Link
                        to={`/quizzes/${quiz.slug}`}
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {quiz?.title}
                    </Link>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>Host</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default QuizSessionBreadcrumb;

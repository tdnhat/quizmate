import { Link } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useTakeQuiz } from "../../hooks/useTakeQuiz";

const QuizDetailBreadcrumb = () => {
    const { quiz } = useTakeQuiz();

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
                    <BreadcrumbPage>{quiz?.title}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default QuizDetailBreadcrumb;

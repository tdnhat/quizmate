import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

type QuizzesBreadcrumbProps = {
    currentPage?: 'popular' | 'recent' | 'all' | null;
};

const QuizzesBreadcrumb = ({ currentPage }: QuizzesBreadcrumbProps = {}) => {
    const pageTitles = {
        'popular': 'Popular Quizzes',
        'recent': 'Recently Added Quizzes',
        'all': 'All'
    };

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
                    {currentPage ? (
                        <Link
                            to="/quizzes"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Quizzes
                        </Link>
                    ) : (
                        <BreadcrumbPage>Quizzes</BreadcrumbPage>
                    )}
                </BreadcrumbItem>
                
                {currentPage && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{pageTitles[currentPage]}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default QuizzesBreadcrumb;

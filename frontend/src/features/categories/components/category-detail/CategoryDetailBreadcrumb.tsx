import {
    Breadcrumb,
    BreadcrumbSeparator,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

interface CategoryDetailBreadcrumbProps {
    categoryName?: string;
}

const CategoryDetailBreadcrumb = ({
    categoryName,
}: CategoryDetailBreadcrumbProps) => {
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
                    {categoryName ? (
                        <Link
                            to="/categories"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Categories
                        </Link>
                    ) : (
                        <BreadcrumbPage>Categories</BreadcrumbPage>
                    )}
                </BreadcrumbItem>
                {categoryName && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{categoryName}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default CategoryDetailBreadcrumb;

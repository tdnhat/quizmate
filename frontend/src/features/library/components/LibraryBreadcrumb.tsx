import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbSeparator,
    BreadcrumbPage,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const LibraryBreadcrumb = () => {
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
                    <BreadcrumbPage>Library</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default LibraryBreadcrumb;

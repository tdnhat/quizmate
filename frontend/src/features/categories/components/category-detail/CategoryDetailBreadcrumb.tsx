import {
    Breadcrumb,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";

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
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    {categoryName ? (
                        <BreadcrumbLink href="/categories">
                            Categories
                        </BreadcrumbLink>
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

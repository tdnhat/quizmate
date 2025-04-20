import { Link } from "react-router-dom"

import { Breadcrumb, BreadcrumbSeparator, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"

const SettingsBreadcrumb = () => {
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
                    <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default SettingsBreadcrumb;

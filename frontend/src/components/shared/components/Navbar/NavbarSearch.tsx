import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const NavbarSearch = () => {
    return (
        <div className="hidden md:flex items-center max-w-md w-full mx-4">
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search for quizzes..."
                    className="pl-9 bg-gray-50 border-gray-200 focus:bg-white"
                />
            </div>
        </div>
    );
};

export default NavbarSearch;

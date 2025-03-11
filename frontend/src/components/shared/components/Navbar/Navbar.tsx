import NavbarProfile from "./NavbarProfile";
import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavbarSearch from "./NavbarSearch";
import NavbarLogo from "./NavbarLogo";
import { NavbarCreate } from "./NavbarCreate";

const Navbar = () => {
    return (
        <div className="flex items-center justify-between px-4 md:px-8 py-3 shadow-sm border-b border-gray-100 bg-white sticky top-0 z-50">
            <NavbarLogo />

            <NavbarSearch />

            {/* Right section */}
            <div className="flex items-center gap-2 md:gap-4">
                <Button variant="ghost" size="icon" className="text-gray-600">
                    <BellIcon className="h-5 w-5" />
                </Button>

                <NavbarCreate />

                <NavbarProfile />
            </div>
        </div>
    );
};

export default Navbar;

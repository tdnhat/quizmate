import { Link } from "react-router-dom";
import { Twitter } from "lucide-react";

const Footer = () => (
    <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <Link to="/">
                        <img
                            src="/Logo.svg"
                            alt="QuizMate Logo"
                            className="h-10 w-auto mb-4"
                        />
                    </Link>
                    <p className="mb-4 text-gray-500 text-base">
                        Making quiz creation simple and engaging for educators
                        everywhere.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-white">
                            <span className="sr-only">Twitter</span>
                            <Twitter size={24} className="text-gray-500"/>
                        </a>
                        {/* Add other social icons */}
                    </div>
                </div>

                <div>
                    <h4 className="text-emerald-500 text-sm font-semibold tracking-wide mb-4">
                        PRODUCTS
                    </h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:text-white">
                                Features
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Testimonials
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                FAQ
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-emerald-500 text-sm font-semibold tracking-wide mb-4">
                        RESOURCES
                    </h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:text-white">
                                Blog
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Documentation
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Community
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Support
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-emerald-500 text-sm font-semibold tracking-wide mb-4">
                        COMPANY
                    </h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:text-white">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Careers
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Privacy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Terms
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-8 text-sm text-center">
                <p>
                    &copy; {new Date().getFullYear()} QuizMate. All rights
                    reserved.
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;

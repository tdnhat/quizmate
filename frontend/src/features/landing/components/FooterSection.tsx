import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

const FooterSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const columnVariants = {
        hidden: { 
            opacity: 0,
            y: 20
        },
        visible: { 
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const socialVariants = {
        hover: { 
            scale: 1.2,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <motion.div 
                className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <motion.div variants={columnVariants} className="space-y-4">
                        <h3 className="text-white text-lg font-semibold mb-4">QuizMate</h3>
                        <p className="text-sm">
                            Making quiz creation and management easier for educators and content creators worldwide.
                        </p>
                        <div className="flex space-x-4">
                            <motion.a 
                                href="https://github.com/tdnhat/quizmate" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                variants={socialVariants}
                                whileHover="hover"
                                className="hover:text-white"
                                title="GitHub Repository"
                            >
                                <Github size={20} />
                            </motion.a>
                            <motion.a 
                                href="#" 
                                variants={socialVariants}
                                whileHover="hover"
                                className="hover:text-white"
                            >
                                <Facebook size={20} />
                            </motion.a>
                            <motion.a 
                                href="#" 
                                variants={socialVariants}
                                whileHover="hover"
                                className="hover:text-white"
                            >
                                <Twitter size={20} />
                            </motion.a>
                            <motion.a 
                                href="#" 
                                variants={socialVariants}
                                whileHover="hover"
                                className="hover:text-white"
                            >
                                <Instagram size={20} />
                            </motion.a>
                            <motion.a 
                                href="#" 
                                variants={socialVariants}
                                whileHover="hover"
                                className="hover:text-white"
                            >
                                <Linkedin size={20} />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Product */}
                    <motion.div variants={columnVariants}>
                        <h3 className="text-white text-lg font-semibold mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white transition">Features</a></li>
                            <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                            <li><a href="#" className="hover:text-white transition">Use Cases</a></li>
                            <li><a href="#" className="hover:text-white transition">Updates</a></li>
                        </ul>
                    </motion.div>

                    {/* Resources */}
                    <motion.div variants={columnVariants}>
                        <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white transition">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition">Community</a></li>
                        </ul>
                    </motion.div>

                    {/* Company */}
                    <motion.div variants={columnVariants}>
                        <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white transition">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition">Legal</a></li>
                        </ul>
                    </motion.div>
                </div>

                <motion.div 
                    variants={columnVariants}
                    className="border-t border-gray-800 mt-12 pt-8 text-sm text-center"
                >
                    <p>&copy; {new Date().getFullYear()} QuizMate. All rights reserved.</p>
                </motion.div>
            </motion.div>
        </footer>
    );
};

export default FooterSection;

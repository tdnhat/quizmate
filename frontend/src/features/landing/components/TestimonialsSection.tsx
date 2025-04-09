import { testimonials } from "@/types/testimonials";
import EmblaCarousel from "../../../components/shared/components/EmblaCarousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Testimonial } from "@/types/testimonials";
import { motion } from "framer-motion";

const OPTIONS: EmblaOptionsType = {
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
    dragFree: false,
};

const TestimonialsSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <section
            id="testimonials"
            className="py-20 bg-gradient-to-br from-cyan-600 to-blue-800"
        >
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                <motion.div
                    className="text-center mb-12"
                    variants={cardVariants}
                >
                    <h2 className="text-4xl text-white font-bold mb-4">
                        What Our Users Say
                    </h2>
                    <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
                        Join thousands of educators and trainers who are
                        creating engaging assessments with QuizMate
                    </p>
                </motion.div>

                <motion.div variants={cardVariants}>
                    <TestimonialCarousel
                        testimonials={testimonials}
                        options={OPTIONS}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

// Custom testimonial carousel component that uses EmblaCarousel under the hood
type TestimonialCarouselProps = {
    testimonials: Testimonial[];
    options: EmblaOptionsType;
};

const TestimonialCarousel = ({
    testimonials,
    options,
}: TestimonialCarouselProps) => {
    // We now use the actual testimonials array length instead of a fake count
    const slides = Array.from(Array(testimonials.length).keys());

    return (
        <div className="embla-testimonials">
            <EmblaCarousel
                slides={slides}
                options={options}
                renderSlide={(index) => (
                    <TestimonialCard testimonial={testimonials[index]} />
                )}
            />
        </div>
    );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
    return (
        <div className="p-6 md:p-8 bg-white rounded-xl shadow-lg select-none min-h-[280px] flex flex-col">
            <div className="flex items-center mb-6">
                <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                    <h4 className="font-bold text-gray-800">
                        {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                        {testimonial.role}, {testimonial.company}
                    </p>
                </div>
            </div>
            <div className="flex-grow flex flex-col">
                <svg
                    className="h-8 w-8 text-indigo-400 mb-4"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-gray-800 italic text-base md:text-lg">
                    "{testimonial.quote}"
                </p>
            </div>
        </div>
    );
};

export default TestimonialsSection;

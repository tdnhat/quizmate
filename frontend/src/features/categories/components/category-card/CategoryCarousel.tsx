import { Category } from "@/types/category";
import CategoryCard from "../CategoryCard";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";

interface CategoryCarouselProps {
    categories: Category[];
}

// Dot button component for navigation
const DotButton = ({
    selected,
    onClick,
}: {
    selected: boolean;
    onClick: () => void;
}) => (
    <button
        className={cn(
            "w-4 h-1.5 rounded-full mx-1.5 cursor-pointer transition-all focus:outline-none",
            selected ? "bg-cyan-600" : "bg-gray-300 hover:bg-cyan-300"
        )}
        type="button"
        onClick={onClick}
    />
);

const CategoryCarousel = ({ categories }: CategoryCarouselProps) => {
    // Setup Embla carousel with options
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "start",
        containScroll: "trimSnaps",
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnapIndices, setScrollSnapIndices] = useState<number[]>([]);

    // Get the actual scroll snap positions from the carousel
    const updateScrollSnapIndices = useCallback(() => {
        if (!emblaApi) return;

        // Get the actual scroll snap positions
        const snapCount = emblaApi.scrollSnapList().length;
        setScrollSnapIndices(Array.from(Array(snapCount).keys()));
    }, [emblaApi]);

    // Update selected index when carousel changes
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    // Handle dot button click
    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) {
                emblaApi.scrollTo(index);
            }
        },
        [emblaApi]
    );

    // Setup event listeners
    useEffect(() => {
        if (!emblaApi) return;

        // Run after Embla initializes
        setTimeout(() => {
            updateScrollSnapIndices();
            onSelect();
        }, 0);

        // Add event listeners
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", () => {
            updateScrollSnapIndices();
            onSelect();
        });

        // Handle resize which might change the number of scroll positions
        window.addEventListener("resize", updateScrollSnapIndices);

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", () => {
                updateScrollSnapIndices();
                onSelect();
            });
            window.removeEventListener("resize", updateScrollSnapIndices);
        };
    }, [emblaApi, onSelect, updateScrollSnapIndices]);

    // Only show dots if we have more than one scroll position
    const showDots = scrollSnapIndices.length > 1;

    return (
        <div className="relative w-full">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4">
                    {categories.map((category, index) => (
                        <div
                            className="pl-4 min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                            key={index}
                        >
                            <div className="h-full rounded-xl overflow-hidden bg-transparent">
                                <CategoryCard category={category} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots navigation */}
            {showDots && (
                <div className="flex justify-center mt-4">
                    <div className="flex items-center">
                        {scrollSnapIndices.map((index) => (
                            <DotButton
                                key={index}
                                selected={index === selectedIndex}
                                onClick={() => scrollTo(index)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryCarousel; 
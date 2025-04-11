import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useFilter } from "@/features/filters/hooks/useFilter";

const sortOptions = [
    { label: "Newest", value: "createdAt" },
    { label: "Most Popular", value: "completions" },
    { label: "Highest Rated", value: "rating" },
];

const SortCombobox = () => {
    const { filters, handleSortChange } = useFilter();
    const [open, setOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState("");

    // Map the current sort option based on filters
    useEffect(() => {
        const currentOption = sortOptions.find(
            (option) => option.value === filters.sortBy && filters.isDescending
        );
        setSelectedLabel(currentOption?.label || "Newest");
    }, [filters.sortBy, filters.isDescending]);

    const onSelectOption = (currentValue: string) => {
        const option = sortOptions.find((opt) => opt.label === currentValue);
        if (option) {
            handleSortChange(option.label);
            setSelectedLabel(option.label);
        }
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    role="combobox"
                    aria-expanded={open}
                    className="inline-flex w-[180px] items-center justify-between cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 border border-gray-200"
                >
                    <span>{selectedLabel || "Sort by"}</span>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-[180px] p-0">
                <Command>
                    <CommandGroup>
                        <CommandList>
                            {sortOptions.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={onSelectOption}
                                    className="cursor-pointer"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedLabel === option.label
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SortCombobox;

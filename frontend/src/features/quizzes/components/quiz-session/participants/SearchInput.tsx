import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => (
    <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
            placeholder="Search participants..."
            value={value}
            onChange={onChange}
            className="pl-10"
        />
    </div>
);

export default SearchInput; 
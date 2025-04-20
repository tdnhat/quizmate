import { useLibraryContext } from "../context/LibraryContext";
import { LibraryTab } from "../types";

interface LibraryTabsProps {
    className?: string;
}

const LibraryTabs = ({ className = "" }: LibraryTabsProps) => {
    const { activeTab, setActiveTab } = useLibraryContext();

    const tabs: { key: LibraryTab; label: string }[] = [
        { key: "my-quizzes", label: "Created" },
        { key: "saved", label: "Saved" },
    ];

    return (
        <div className={`border-b ${className}`}>
            {/* Container - on large screens, align to the left */}
            <div className="flex w-full md:w-auto md:inline-flex">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`
                            flex-1 md:flex-initial
                            px-4 py-2 
                            border-b-2 
                            font-medium 
                            text-sm 
                            text-center 
                            cursor-pointer 
                            ${activeTab === tab.key
                                ? "border-cyan-500 border-b-3 text-cyan-600 font-semibold"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            } 
                            transition-colors duration-200
                            md:min-w-[120px]
                        `}
                        aria-current={
                            activeTab === tab.key ? "page" : undefined
                        }
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LibraryTabs;

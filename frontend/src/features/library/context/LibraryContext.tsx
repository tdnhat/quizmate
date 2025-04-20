import React, { createContext, useContext, ReactNode, useState } from "react";
import { useToggleSaveQuizMutation, useDeleteQuizMutation } from "../hooks/useLibraryMutations";
import { Quiz } from "@/types/quiz";
import { LibraryTab, QuizQueryParams } from "../types";

// The possible views for quizzes in the library
type ViewMode = "grid" | "list";

// Library context type definition
interface LibraryContextType {
  activeTab: LibraryTab;
  setActiveTab: (tab: LibraryTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterCategory: string | null;
  setFilterCategory: (category: string | null) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  handleSortChange: (value: string) => void;
  handleFilterChange: (value: string | null) => void;
  deleteQuiz: (quiz: Quiz) => void;
  isDeletingQuiz: boolean;
  toggleSaveQuiz: (quizId: string, title?: string) => void;
  queryParams: QuizQueryParams;
  updateQueryParams: (params: Partial<QuizQueryParams>) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
}

// Creating context with default values
const LibraryContext = createContext<LibraryContextType>({
  activeTab: "my-quizzes",
  setActiveTab: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  filterCategory: null,
  setFilterCategory: () => {},
  sortBy: "newest",
  setSortBy: () => {},
  viewMode: "grid",
  setViewMode: () => {},
  handleSortChange: () => {},
  handleFilterChange: () => {},
  deleteQuiz: () => {},
  isDeletingQuiz: false,
  toggleSaveQuiz: () => {},
  queryParams: { pageNumber: 1, pageSize: 9 },
  updateQueryParams: () => {},
  totalPages: 1,
  setTotalPages: () => {},
});

export const useLibraryContext = () => useContext(LibraryContext);

interface LibraryProviderProps {
  children: ReactNode;
}

export const LibraryProvider: React.FC<LibraryProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<LibraryTab>("my-quizzes");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [totalPages, setTotalPages] = useState(1);
  const [queryParams, setQueryParams] = useState<QuizQueryParams>({
    pageNumber: 1,
    pageSize: 9,
    tab: activeTab
  });
  
  const { mutate: toggleSave } = useToggleSaveQuizMutation();
  const { mutate: deleteQuizMutation, isPending: isDeletingQuiz } = useDeleteQuizMutation();

  const updateQueryParams = (params: Partial<QuizQueryParams>) => {
    setQueryParams(prevParams => ({
      ...prevParams,
      ...params
    }));
  };

  // Update tab in queryParams when activeTab changes
  React.useEffect(() => {
    updateQueryParams({ tab: activeTab });
  }, [activeTab]);

  // Update search in queryParams when searchQuery changes
  React.useEffect(() => {
    updateQueryParams({ searchTerm: searchQuery });
  }, [searchQuery]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    
    // Additional logic based on selected sort option can be added here
    // For example:
    switch (value) {
      case "newest":
        // Logic for sorting by newest
        break;
      case "popular":
        // Logic for sorting by most popular
        break;
      case "highest":
        // Logic for sorting by highest rated
        break;
      default:
        // Default sorting logic
        break;
    }
  };

  const handleFilterChange = (value: string | null) => {
    setFilterCategory(value);
  };

  const deleteQuiz = (quiz: Quiz) => {
    deleteQuizMutation({
      quizId: quiz.id,
      title: quiz.title
    });
  };

  const toggleSaveQuiz = (quizId: string, title?: string) => {
    toggleSave({
      quizId,
      title
    });
  };

  return (
    <LibraryContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        filterCategory,
        setFilterCategory,
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        handleSortChange,
        handleFilterChange,
        deleteQuiz,
        isDeletingQuiz,
        toggleSaveQuiz,
        queryParams,
        updateQueryParams,
        totalPages,
        setTotalPages
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export default LibraryContext; 
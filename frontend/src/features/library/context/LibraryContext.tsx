import { createContext, useContext, ReactNode, useState } from 'react';
import { LibraryTab, QuizQueryParams } from '../types';

interface LibraryContextType {
  queryParams: QuizQueryParams;
  updateQueryParams: (newParams: QuizQueryParams) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
  activeTab: LibraryTab;
  setActiveTab: (tab: LibraryTab) => void;
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
  handleFilterChange: (key: keyof QuizQueryParams, value: string | number | boolean | undefined) => void;
  handleSortChange: (sortOption: string) => void;
  clearAllFilters: () => void;
}

const defaultContext: LibraryContextType = {
  queryParams: {
    pageNumber: 1,
    pageSize: 9,
    sortBy: 'createdAt',
    isAscending: false,
    tab: 'my-quizzes'
  },
  updateQueryParams: () => {},
  totalPages: 1,
  setTotalPages: () => {},
  activeTab: 'my-quizzes',
  setActiveTab: () => {},
  viewMode: 'grid',
  setViewMode: () => {},
  handleFilterChange: () => {},
  handleSortChange: () => {},
  clearAllFilters: () => {}
};

const LibraryContext = createContext<LibraryContextType>(defaultContext);

export const useLibraryContext = () => useContext(LibraryContext);

interface LibraryProviderProps {
  children: ReactNode;
}

export const LibraryProvider = ({ children }: LibraryProviderProps) => {
  const [queryParams, setQueryParams] = useState<QuizQueryParams>(defaultContext.queryParams);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState<LibraryTab>('my-quizzes');
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

  const updateQueryParams = (newParams: QuizQueryParams) => {
    setQueryParams(prevParams => ({
      ...prevParams,
      ...newParams
    }));
  };

  // Update query params when tab changes
  const handleTabChange = (tab: LibraryTab) => {
    setActiveTab(tab);
    updateQueryParams({ 
      tab,
      pageNumber: 1 // Reset to first page when changing tabs
    });
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof QuizQueryParams, value: string | number | boolean | undefined) => {
    updateQueryParams({
      [key]: value,
      pageNumber: 1 // Reset to first page when filters change
    } as QuizQueryParams);
  };

  // Handle sort changes
  const handleSortChange = (sortOption: string) => {
    switch (sortOption) {
      case "Newest":
        updateQueryParams({
          sortBy: "createdAt",
          isAscending: false,
          pageNumber: 1
        });
        break;
      case "Most Popular":
        updateQueryParams({
          sortBy: "completions",
          isAscending: false,
          pageNumber: 1
        });
        break;
      case "Highest Rated":
        updateQueryParams({
          sortBy: "rating",
          isAscending: false,
          pageNumber: 1
        });
        break;
      default:
        updateQueryParams({
          sortBy: "createdAt",
          isAscending: false,
          pageNumber: 1
        });
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    updateQueryParams({
      searchTerm: undefined,
      difficulty: undefined,
      duration: undefined,
      timeFrame: undefined,
      quizType: undefined,
      sortBy: 'createdAt',
      isAscending: false,
      pageNumber: 1
    });
  };

  return (
    <LibraryContext.Provider
      value={{
        queryParams,
        updateQueryParams,
        totalPages,
        setTotalPages,
        activeTab,
        setActiveTab: handleTabChange,
        viewMode,
        setViewMode,
        handleFilterChange,
        handleSortChange,
        clearAllFilters
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export default LibraryContext; 
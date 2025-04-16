import { createContext, useContext, ReactNode, useState } from 'react';
import { LibraryTab, QuizQueryParams } from '../types';

interface LibraryContextType {
  queryParams: QuizQueryParams;
  updateQueryParams: (newParams: QuizQueryParams) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
  activeTab: LibraryTab;
  setActiveTab: (tab: LibraryTab) => void;
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
  setActiveTab: () => {}
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

  return (
    <LibraryContext.Provider
      value={{
        queryParams,
        updateQueryParams,
        totalPages,
        setTotalPages,
        activeTab,
        setActiveTab: handleTabChange
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export default LibraryContext; 
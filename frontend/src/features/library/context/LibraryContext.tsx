import { createContext, useContext, ReactNode, useState } from 'react';
import { QuizQueryParams } from '../types';

interface LibraryContextType {
  queryParams: QuizQueryParams;
  updateQueryParams: (newParams: QuizQueryParams) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
}

const defaultContext: LibraryContextType = {
  queryParams: {
    pageNumber: 1,
    pageSize: 9,
    sortBy: 'createdAt',
    isAscending: false
  },
  updateQueryParams: () => {},
  totalPages: 1,
  setTotalPages: () => {}
};

const LibraryContext = createContext<LibraryContextType>(defaultContext);

export const useLibraryContext = () => useContext(LibraryContext);

interface LibraryProviderProps {
  children: ReactNode;
}

export const LibraryProvider = ({ children }: LibraryProviderProps) => {
  const [queryParams, setQueryParams] = useState<QuizQueryParams>(defaultContext.queryParams);
  const [totalPages, setTotalPages] = useState(1);

  const updateQueryParams = (newParams: QuizQueryParams) => {
    setQueryParams(prevParams => ({
      ...prevParams,
      ...newParams
    }));
  };

  return (
    <LibraryContext.Provider
      value={{
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
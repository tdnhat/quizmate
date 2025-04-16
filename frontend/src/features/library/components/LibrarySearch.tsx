import { FC, useState } from 'react';
import { QuizQueryParams } from '../types';

interface LibrarySearchProps {
  onSearch: (params: QuizQueryParams) => void;
  initialParams?: QuizQueryParams;
}

const sortOptions = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'title', label: 'Title' },
  { value: 'questionsCount', label: 'Number of Questions' }
];

const LibrarySearch: FC<LibrarySearchProps> = ({ onSearch, initialParams = {} }) => {
  const [searchTerm, setSearchTerm] = useState(initialParams.searchTerm || '');
  const [sortBy, setSortBy] = useState(initialParams.sortBy || 'createdAt');
  const [isAscending, setIsAscending] = useState(initialParams.isAscending ?? false);

  const handleSearch = () => {
    onSearch({
      searchTerm,
      sortBy,
      isAscending,
      pageNumber: 1 // Reset to first page on new search
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleSortDirection = () => {
    setIsAscending(!isAscending);
    onSearch({
      searchTerm,
      sortBy,
      isAscending: !isAscending,
      pageNumber: 1
    });
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Search saved quizzes..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              onSearch({
                searchTerm,
                sortBy: e.target.value,
                isAscending,
                pageNumber: 1
              });
            }}
            className="bg-white border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Sort by"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <button
            onClick={toggleSortDirection}
            className="border rounded-md px-3 py-2 focus:outline-none hover:bg-gray-50"
            aria-label={isAscending ? "Sort descending" : "Sort ascending"}
          >
            {isAscending ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LibrarySearch; 
export interface SavedQuizResponse {
  isSaved: boolean;
}

export interface QuizQueryParams {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  sortBy?: string;
  isAscending?: boolean;
} 
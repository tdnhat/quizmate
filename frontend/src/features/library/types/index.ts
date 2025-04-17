export interface SavedQuizResponse {
  isSaved: boolean;
}

export type LibraryTab = 'saved' | 'my-quizzes';

export interface QuizQueryParams {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  sortBy?: string;
  isAscending?: boolean;
  tab?: LibraryTab;
  timeFrame?: string;
  quizType?: string;
  difficulty?: string;
  duration?: string;
} 
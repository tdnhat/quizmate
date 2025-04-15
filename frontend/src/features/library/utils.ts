import { QuizQueryParams } from './types';

export const buildQueryString = (params: QuizQueryParams): string => {
  const queryParams = new URLSearchParams();
  
  if (params.pageNumber) queryParams.append('pageNumber', params.pageNumber.toString());
  if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());
  if (params.searchTerm) queryParams.append('searchTerm', params.searchTerm);
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.isAscending !== undefined) queryParams.append('isAscending', params.isAscending.toString());
  
  return queryParams.toString();
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

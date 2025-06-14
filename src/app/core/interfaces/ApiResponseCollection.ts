export interface ApiResponseCollection<T> {
  success: boolean;
  message?: string;
  data?: Results<T>;
  errors?: string[];
}
export interface Results<T>{
  results: T[];
  pagination: Pagination;
}
export interface PaginationLinks {
  previous?: string | null;
  next?: string | null;
}


export interface Pagination {
  count: number;
  per_page: number;
  current_page: number;
  links: PaginationLinks;
  has_more_pages: boolean;
}

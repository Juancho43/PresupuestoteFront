export interface ApiResponseCollection<T> {
  success: boolean;
  message?: string;
  data?: T[];
  errors?: string[];
}

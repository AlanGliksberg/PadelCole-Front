export type ApiResponse<T> = {
  error: boolean;
  data?: T;
  message?: string;
  code?: number;
};

import { Method } from "axios";

export type ApiResponse<T> = {
  error: boolean;
  data?: T;
  message?: string;
  code?: number;
};

export type ApiParams = {
  body?: any;
  customHeaders?: Record<string, any>;
  withCache?: boolean;
  method?: Method;
  queryParams?: Record<string, any>;
};

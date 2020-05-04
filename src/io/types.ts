export interface IoRequester {
  get: <T>(url: string) => Promise<T>;
  put: <T>(url: string, obj: any) => Promise<T>;
  post: <T>(url: string, obj: any) => Promise<T>;
  delete: <T>(url: string) => Promise<T>;
}

export type Fetch = (url: string, config?: any) => Promise<any>;

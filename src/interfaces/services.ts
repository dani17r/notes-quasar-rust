export type QueryParams = Omit<Pagination, 'count' | 'count_total'> & Filters;

export interface ResponseData<T> {
  data: T[];
  pagination: Pagination;
  filters: Filters;
}

export interface Pagination {
  count_total: number;
  count: number;
  pag: number;
  limit: number;
}

export interface Filters {
  fields_search: string;
  search: string;
  fields: string;
  without: boolean;
  sort: string;
}

import type { Filters, Pagination, ResponseData } from '@interfaces/services';

export interface Category {
  id: number;
  title: string;
  description: string;
}

export interface CategoryUseCreate {
  title: string;
  description: string;
}

export interface Ids {
  ids: number[];
}

export interface State {
  list: Category[];
  current: Category | null;
  loading: boolean;
  pagination: Pagination;
  filters: Filters;
}

export type GetListCategories = ResponseData<Category>;

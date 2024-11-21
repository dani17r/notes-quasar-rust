import type { Filters, Pagination, ResponseData } from '@interfaces/services';

export interface Tag {
  id: number;
  name: string;
  description: string;
  color: string;
}

export interface TagUseCreate {
  name: string;
  description: string;
  color: string;
}

export interface Ids {
  ids: number[];
}

export interface State {
  list: Tag[];
  current: Tag | null;
  loading: boolean;
  pagination: Pagination;
  filters: Filters;
}

export type GetListTags = ResponseData<Tag>;

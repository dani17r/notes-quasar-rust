import type { Filters, Pagination, QueryParams } from '@interfaces/services';

export const defaultQuerys: QueryParams = {
  pag: 1,
  limit: 10,
  fields: '',
  without: false,
  sort: 'id:desc',
  search: '',
  fields_search: '',
  conditionals: '',
};

export const defaultPagination: Pagination = {
  count_total: 0,
  count: 0,
  pag: 1,
  limit: 10,
};

export const defaultFilter: Filters = {
  fields_search: '',
  conditionals: '',
  search: '',
  fields: '',
  without: false,
  sort: '',
};

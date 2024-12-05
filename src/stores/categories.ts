import { defaultFilter, defaultPagination } from '@utils/services';
import type { Category, State } from '@interfaces/categories';
import type { Pagination } from '@interfaces/services';
import categoriesServices from '@services/categories';
import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('category', {
  state: () =>
    <State>{
      list: [],
      current: null,
      loading: false,
      pagination: defaultPagination,
      filters: defaultFilter,
    },
  actions: {
    getListCategories(isPagination = false, pagination?: Partial<Pagination>) {
      return categoriesServices
        .getAll({ ...this.pagination, ...pagination, ...this.filters })
        .then((resp) => {
          if (isPagination) this.list = [...this.list, ...resp.data];
          else this.list = resp.data;

          this.pagination = resp.pagination;
          this.filters = resp.filters;
          return resp;
        })
        .then((resp) => {
          if (!resp.data.length) this.pagination.pag -= 1;
          return resp;
        })
        .catch(() => {
          this.pagination.count = 0;
          return { data: [] };
        })
        .finally(() => (this.loading = true));
    },
    getOneCategory(id: number) {
      return categoriesServices
        .getOne(id)
        .then((data) => {
          this.current = data;
          return data;
        })
        .finally(() => (this.loading = true));
    },
    createOneCategory(payload: Omit<Category, 'id'>) {
      return categoriesServices
        .create(payload)
        .then(() =>
          this.getListCategories(false, { pag: 1, limit: 10 * this.pagination.pag }),
        )
        .finally(() => (this.loading = true));
    },
    updateOneCategory(payload: Partial<Category>) {
      return categoriesServices
        .update(payload)
        .then((data) => {
          this.current = data;
          this.list.some((category, index) => {
            if (category.id === data.id) {
              this.list[index] = data;
              return true;
            }
            return false;
          });

          return data;
        })
        .finally(() => (this.loading = true));
    },
    deleteCategories(payload: number[]) {
      return categoriesServices
        .delete({ ids: payload })
        .then(() =>
          this.getListCategories(false, { pag: 1, limit: 10 * this.pagination.pag }),
        )
        .finally(() => (this.loading = true));
    },
  },
});

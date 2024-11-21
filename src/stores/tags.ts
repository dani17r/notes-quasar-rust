import { defineStore } from 'pinia';
import tagsServices from '@services/tags';
import type { Tag, State } from '@interfaces/tags';
import { defaultFilter, defaultPagination } from '@utils/services';
import type { Pagination } from '@interfaces/services';

export const useTagStore = defineStore('tag', {
  state: () =>
    <State>{
      list: [],
      current: null,
      loading: false,
      pagination: defaultPagination,
      filters: defaultFilter,
    },
  actions: {
    getListTags(isPagination = false, pagination?: Partial<Pagination>) {
      return tagsServices
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
    getOneTag(id: number) {
      return tagsServices
        .getOne(id)
        .then((data) => {
          this.current = data;
          return data;
        })
        .finally(() => (this.loading = true));
    },
    createOneTag(payload: Omit<Tag, 'id'>) {
      return tagsServices
        .create(payload)
        .then(() =>
          this.getListTags(false, { pag: 1, limit: 10 * this.pagination.pag }),
        )
        .finally(() => (this.loading = true));
    },
    updateOneTag(payload: Partial<Tag>) {
      return tagsServices
        .update(payload)
        .then((data) => {
          this.current = data;
          this.list.some((tag, index) => {
            if (tag.id === data.id) {
              this.list[index] = data;
              return true;
            }
            return false;
          });

          return data;
        })
        .finally(() => (this.loading = true));
    },
    deleteTags(payload: number[]) {
      return tagsServices
        .delete({ ids: payload })
        .then(() =>
          this.getListTags(false, { pag: 1, limit: 10 * this.pagination.pag }),
        )
        .finally(() => (this.loading = true));
    },
  },
});

import { defineStore } from 'pinia';
import notesServices from '@services/notes';
import type { Note, State } from '@interfaces/notes';
import { defaultFilter, defaultPagination } from '@utils/services';
import type { Pagination } from '@interfaces/services';

export const useNoteStore = defineStore('note', {
  state: () =>
    <State>{
      list: [],
      current: null,
      loading: false,
      pagination: defaultPagination,
      filters: defaultFilter,
    },
  actions: {
    getListNotes(isPagination = false, pagination?: Partial<Pagination>, updateData = true) {
      return notesServices
        .getAll({ ...this.pagination, ...pagination, ...this.filters })
        .then((resp) => {

          if (updateData) {
            if (isPagination) this.list = [...this.list, ...resp.data];
            else this.list = resp.data;
          }

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
    getOneNote(id: number) {
      return notesServices
        .getOne(id)
        .then((data) => {
          this.current = data;
          return data;
        })
        .finally(() => (this.loading = true));
    },
    createOneNote(payload: Omit<Note, 'id'>) {
      return notesServices
        .create(payload)
        .then((resp) => {
          this.getListNotes(false, { pag: 1, limit: 10 * this.pagination.pag });
          return resp;
        })
        .finally(() => (this.loading = true));
    },
    addTagsInNote(payload: { tag_ids: number[]; note_id: number }) {
      return notesServices
        .addTagsInNote(payload)
        .then((resp) => {
          this.getListNotes(false, { pag: 1, limit: 10 * this.pagination.pag });
          return resp;
        })
        .finally(() => (this.loading = true));
    },
    deleteTagsInNote(payload: { tag_ids: number[]; note_id: number }) {
      return notesServices
        .deleteTagsInNote(payload)
        .then((resp) => {
          this.getListNotes(false, { pag: 1, limit: 10 * this.pagination.pag });
          return resp;
        })
        .finally(() => (this.loading = true));
    },
    updateTagsInNote(payload: { tag_ids: number[]; note_id: number }) {
      return notesServices
        .updateTagsInNote(payload)
        .then((resp) => {
          this.getListNotes(false, { pag: 1, limit: 10 * this.pagination.pag });
          return resp;
        })
        .finally(() => (this.loading = true));
    },
    updateOneNote(payload: Partial<Note>) {
      return notesServices
        .update(payload)
        .then((data) => {
          console.log(data);
          this.current = data;
          this.list.some((note, index) => {
            if (note.id === data.id) {
              this.list[index] = data;
              return true;
            }
            return false;
          });

          return data;
        })
        .finally(() => (this.loading = true));
    },
    deleteNotes(payload: number[]) {
      return notesServices
        .delete({ ids: payload })
        .then(() =>
          this.getListNotes(false, { pag: 1, limit: 10 * this.pagination.pag }),
        )
        .finally(() => (this.loading = true));
    },
  },
});

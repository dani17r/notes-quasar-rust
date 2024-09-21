import { defineStore } from 'pinia';
import notesServices from '@services/notes'
import { Note, State } from '@interfaces/notes';
import { defaultFilter, defaultPagination } from '@utils/services';

export const useNoteStore = defineStore('note', {
  state: () => <State>({
    list: [],
    current: null,
    loading: false,
    pagination: defaultPagination,
    filters: defaultFilter,
  }),
  actions: {
    getListNotes(isPagination = false) {
      return notesServices.getAll({ ...this.pagination, ...this.filters })
        .then((resp) => {
          if (isPagination) this.list = [...this.list, ...resp.data];
          else this.list = resp.data;

          this.pagination = resp.pagination;
          this.filters = resp.filters;
          return resp;
        })
        .finally(() => this.loading = true)
    },
    getOneNote(id: number) {
      return notesServices.getOne(id)
        .then((data) => {
          this.current = data;
          return data;
        })
        .finally(() => this.loading = true)
    },
    createOneNote(payload: Omit<Note, 'id'>) {
      return notesServices.create(payload)
        .finally(() => this.loading = true)
    },
    updateOneNote(payload: Note) {
      return notesServices.update(payload)
        .then((data) => {
          this.current = data;
          return data;
        })
        .finally(() => this.loading = true)
    },
    deleteNotes(payload: number[]) {
      return notesServices.delete({ ids: payload })
        .then(() => this.getListNotes())
        .finally(() => this.loading = true)
    },
  },
});

import { Filters, Pagination, ResponseData } from '@interfaces/services';

export interface Note {
  id: number;
  title: string;
  details: string;
  done: boolean;
}

export interface NoteUseCreate {
  title: string;
  details: string;
  done: boolean;
}

export interface Ids {
  ids: number[];
}

export interface State {
  list: Note[];
  current: Note | null,
  loading: boolean,
  pagination: Pagination;
  filters: Filters;
}

export type GetListNotes = ResponseData<Note>
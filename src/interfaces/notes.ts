import type { Filters, Pagination, ResponseData } from '@interfaces/services';
import type { Tag } from '@interfaces/tags';

export interface Note {
  id: number;
  title: string;
  details: string;
  done: boolean;
  rank: number;
  tags: Tag[];
}

export interface NoteUseCreate {
  title: string;
  details: string;
  done: boolean;
  rank: number;
}

export interface Ids {
  ids: number[];
}

export interface State {
  list: Note[];
  current: Note | null;
  loading: boolean;
  pagination: Pagination;
  filters: Filters;
}

export type GetListNotes = ResponseData<Note>;

import type { GetListNotes, Note } from '@interfaces/notes';
import { defaultQuerys } from '@utils/services';
import { api } from '@/boot/axios';

const flow = 'note';

export default {
  getAll: (query = defaultQuerys) => {
    return api
      .get<GetListNotes>(`${flow}/all`, {
        params: {
          ...query,
        },
      })
      .then((resp) => resp.data);
  },
  getOne: (id: number) => {
    return api.get<Note>(`note/one/${id}`).then((resp) => resp.data);
  },
  create: (payload: Omit<Note, 'id'>) => {
    return api.post<Note>('note/create', payload).then((resp) => resp.data);
  },
  addTagsInNote: (payload: { tag_ids: number[]; note_id: number }) => {
    return api.post<Note>('note/add/tags', payload).then((resp) => resp.data);
  },
  deleteTagsInNote: (payload: { tag_ids: number[]; note_id: number }) => {
    return api
      .post<Note>('note/delete/tags', payload)
      .then((resp) => resp.data);
  },
  updateTagsInNote: (payload: { tag_ids: number[]; note_id: number }) => {
    return api
      .post<Note>('note/update/tags', payload)
      .then((resp) => resp.data);
  },
  update: (payload: Partial<Note>) => {
    return api.put<Note>('note/update', payload).then((resp) => resp.data);
  },
  delete: (payload: { ids: number[] }) => {
    return api
      .delete('note/delete', {
        data: payload,
      })
      .then((resp) => resp.data);
  },
};

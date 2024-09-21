import { GetListNotes, Note } from '@interfaces/notes';
import { defaultQuerys } from '@utils/services';
import { api } from '@/boot/axios';

const flow = 'note';

export default {
  getAll: (query = defaultQuerys) => {
    return api.get<GetListNotes>(`${flow}/all`, {
      params: {
        ...query
      }
    })
      .then((resp) => resp.data);
  },
  getOne: (id: number) => {
    return api.get<Note>(`note/one/${id}`).then((resp) => resp.data);
  },
  create: (payload: Omit<Note, 'id'>) => {
    return api.post<Note>('note/create', payload).then((resp) => resp.data);
  },
  update: (payload: Note) => {
    return api.put<Note>('note/update', payload).then((resp) => resp.data);
  },
  delete: (payload: { ids: number[] }) => {
    return api.delete('note/delete', {
      data: payload
    }).then((resp) => resp.data);
  },
}
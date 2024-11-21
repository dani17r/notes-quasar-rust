import type { GetListTags, Tag } from '@interfaces/tags';
import { defaultQuerys } from '@utils/services';
import { api } from '@/boot/axios';

const flow = 'tag';

export default {
  getAll: (query = defaultQuerys) => {
    return api
      .get<GetListTags>(`${flow}/all`, {
        params: {
          ...query,
        },
      })
      .then((resp) => resp.data);
  },
  getOne: (id: number) => {
    return api.get<Tag>(`tag/one/${id}`).then((resp) => resp.data);
  },
  create: (payload: Omit<Tag, 'id'>) => {
    return api.post<Tag>('tag/create', payload).then((resp) => resp.data);
  },
  update: (payload: Partial<Tag>) => {
    return api.put<Tag>('tag/update', payload).then((resp) => resp.data);
  },
  delete: (payload: { ids: number[] }) => {
    return api
      .delete('tag/delete', {
        data: payload,
      })
      .then((resp) => resp.data);
  },
};

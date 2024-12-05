import type { GetListCategories, Category } from '@interfaces/categories';
import { defaultQuerys } from '@utils/services';
import { api } from '@/boot/axios';

const flow = 'category';

export default {
  getAll: (query = defaultQuerys) => {
    return api
      .get<GetListCategories>(`${flow}/all`, {
        params: {
          ...query,
        },
      })
      .then((resp) => resp.data);
  },
  getOne: (id: number) => {
    return api.get<Category>(`${flow}/one/${id}`).then((resp) => resp.data);
  },
  create: (payload: Omit<Category, 'id'>) => {
    return api.post<Category>(`${flow}/create`, payload).then((resp) => resp.data);
  },
  update: (payload: Partial<Category>) => {
    return api.put<Category>(`${flow}/update`, payload).then((resp) => resp.data);
  },
  delete: (payload: { ids: number[] }) => {
    return api
      .delete(`${flow}/delete`, {
        data: payload,
      })
      .then((resp) => resp.data);
  },
};

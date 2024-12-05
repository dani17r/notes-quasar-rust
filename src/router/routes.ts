import categoriesRouter from '@router/modules/categories';
import errorsRouter from '@router/modules/errors';
import type { RouteRecordRaw } from 'vue-router';
import notesRouter from '@router/modules/notes';
import tagsRouter from '@router/modules/tags';
import homeRouter from './modules/home';

const routes: RouteRecordRaw[] = [
  ...homeRouter(),
  ...notesRouter(),
  ...tagsRouter(),
  ...categoriesRouter(),
  ...errorsRouter(),
];

export default routes;

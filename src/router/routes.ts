import type { RouteRecordRaw } from 'vue-router';
import tagsRouter from '@router/modules/tags';
import notesRouter from '@router/modules/notes';
import errorsRouter from '@router/modules/errors';
import homeRouter from './modules/home';

const routes: RouteRecordRaw[] = [
  ...homeRouter(),
  ...notesRouter(),
  ...tagsRouter(),
  ...errorsRouter(),
];

export default routes;

import { RouteRecordRaw } from 'vue-router';
import notesRouter from '@router/modules/notes';
import errorsRouter from '@router/modules/errors';
import homeRouter from './modules/home';

const routes: RouteRecordRaw[] = [
  ...homeRouter(),
  ...notesRouter(),
  ...errorsRouter(),
];

export default routes;

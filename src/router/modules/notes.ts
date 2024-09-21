import {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from 'vue-router';

export default () => [
  {
    path: '/notes',
    component: () => import('@layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index-notes',
        component: () => import('@pages/NotesPage.vue'),
      },
      {
        path: ':state/:id?',
        name: 'view-note',
        component: () => import('@modules/notes/ViewNote.vue'),
        beforeEnter: (
          to: RouteLocationNormalized,
          _: RouteLocationNormalizedLoaded,
          next: NavigationGuardNext,
        ) => {
          const validStates = ['add', 'edit'];
          if (validStates.includes(String(to.params.state))) next();
          else next({ name: 'error-not-found' });
        },
      },
    ],
  },
];

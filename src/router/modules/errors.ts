export default () => [
  {
    path: '/404',
    name: 'error-not-found',
    component: () => import('@pages/ErrorNotFound.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
];

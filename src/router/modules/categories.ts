export default () => [
  {
    path: '/categories',
    component: () => import('@layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index-categories',
        component: () => import('@pages/CategoriesPage.vue'),
      },
    ],
  },
];

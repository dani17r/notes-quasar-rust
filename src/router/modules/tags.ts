export default () => [
  {
    path: '/tags',
    component: () => import('@layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index-tags',
        component: () => import('@pages/TagsPage.vue'),
      },
    ],
  },
];

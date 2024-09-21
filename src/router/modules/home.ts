export default () => [
  {
    path: '/',
    component: () => import('@layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('@pages/IndexPage.vue'),
      },
    ],
  },
];

import { routerPath } from '@/config';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    name: routerPath.home.name,
    path: routerPath.home.path,
    component: () => import('@/views/pages/Home.vue'),
  },
  {
    name: routerPath.homeByDate.name,
    path: routerPath.homeByDate.path,
    component: () => import('@/views/pages/Home.vue'),
  },
  {
    name: routerPath.homeByDateRange.name,
    path: routerPath.homeByDateRange.path,
    component: () => import('@/views/pages/Home.vue'),
  },
  {
    name: routerPath.help.name,
    path: routerPath.help.path,
    component: () => import('@/views/pages/Help.vue'),
  },
  {
    name: routerPath.notFound.name,
    path: routerPath.notFound.path,
    component: () => import('@/views/pages/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

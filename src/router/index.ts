// eslint-disable-next-line import/no-extraneous-dependencies
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Home from '../pages/Home.vue';
import Error from '../pages/Error.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/error',
    name: 'Error',
    component: Error,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
        {
            path: '/',
            name: 'HomeView',
            component: () => import('./views/HomeView.vue'),
            meta: { requiresAuth: true }
          },
        {
            path: '/login',
            name: 'LoginTeste',
            component: () => import('./views/LoginTeste.vue'),
          },
        {
            path: '/reset',
            name: 'PasswordRecovery',
            component: () => import('./views/PasswordRecovery.vue'),
          },
       
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
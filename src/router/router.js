import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../components/MainLayout.vue'),
            children: [
                {
                    path: '/',
                    component: () => import('../views/Home.vue')
                },
                {
                    path: '/qr-scanner',
                    component: () => import('../views/QRScanner.vue')
                }
            ]
        },
        {
            path: '/login',
            component: () => import('../views/Login.vue')
        }
    ]
})

export default router;
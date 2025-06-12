import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../components/MainLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: () => import('../views/Home.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'qr-scanner',
                    name: 'QR Scanner',
                    component: () => import('../views/QRScanner.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'profile',
                    name: 'Profile',
                    component: () => import('../views/Profile.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'personal-info',
                    name: 'Personal Info',
                    component: () => import('../views/PersonalInfo.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'notification',
                    name: 'Notification',
                    component: () => import('../views/Notification.vue'),
                    meta: { requiresAuth: true }
                }
            ]
        },
        {
            path: '/login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '/reset-password',
            component: () => import('../views/ResetPassword.vue')
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const auth = store.state.auth;
    if (!auth.hasChecked) {
        await store.dispatch('auth/verifyToken');
    }

    if (to.meta.requiresAuth && !store.state.auth.isAuthenticated) {
        return next('/login');
    }

    if (to.path === '/login' && store.state.auth.isAuthenticated) {
        return next('/');
    }

    return next();
});

export default router;
import VueRouter from 'vue-router'
import helper from './services/helper'

let routes = [
    {
        path: '/',
        component: require('./layouts/default-page'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '/',
                component: require('./views/pages/home')
            },
            {
                path: '/home',
                component: require('./views/pages/home')
            },
            {
                path: '/blank',
                component: require('./views/pages/blank')
            },
            {
                path: '/configuration',
                component: require('./views/configuration/configuration')
            },
            {
                path: '/profile',
                component: require('./views/user/profile')
            },
            {
                path: '/task',
                component: require('./views/task/index')
            },
            {
                path: '/task/:id/edit',
                component: require('./views/task/edit')
            },
            {
                path: '/user',
                component: require('./views/user/index')
            },
        ]
    },
    {
        path: '/',
        component: require('./layouts/guest-page'),
        meta: { requiresGuest: true },
        children: [
            {
                path: '/login',
                component: require('./views/auth/login')
            },
            {
                path: '/password',
                component: require('./views/auth/password')
            },
            {
                path: '/register',
                component: require('./views/auth/register')
            },
            {
                path: '/auth/:token/activate',
                component: require('./views/auth/activate')
            },
            {
                path: '/password/reset/:token',
                component: require('./views/auth/reset')
            },
            {
                path: '/auth/social',
                component: require('./views/auth/social-auth')
            },
        ]
    },
    {
        path: '*',
        component : require('./layouts/error-page'),
        children: [
            {
                path: '*',
                component: require('./views/errors/page-not-found')
            }
        ]
    }
];

const router = new VueRouter({
	routes,
    linkActiveClass: 'active',
    mode: 'history'
});

router.beforeEach((to, from, next) => {

    if (to.matched.some(m => m.meta.requiresAuth)){
        return helper.check().then(response => {
            if(!response){
                return next({ path : '/login'})
            }

            return next()
        })
    }

    if (to.matched.some(m => m.meta.requiresGuest)){
        return helper.check().then(response => {
            if(response){
                return next({ path : '/'})
            }

            return next()
        })
    }

    return next()
});

export default router;

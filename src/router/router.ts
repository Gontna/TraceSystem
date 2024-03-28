const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/404',
        name: 'error',
        component: () => import('@/views/login/login.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
        meta: {title: '登录'}
    },
    {
        path: '/system',
        name: 'home',
        redirect: '/system/account',
        component: () => import('@/views/HomeView.vue'),
        children: [
            {
                path: 'account',
                name: 'account',
                redirect: '/system/account/list',
                componenet: () => import('@/views/accountSetting/index.vue'),
                mate: {title: '账号管理'},
                children: [
                    {
                        path: 'list',
                        name: 'accountList',
                        component: () => import('@/views/accountSetting/ListView.vue')

                    }
                ]
            }
        ]
    }
]
export default routes
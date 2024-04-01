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

                children: [
                    {
                        path: 'list',
                        name: 'accountList',
                        component: () => import('@/views/accountSetting/ListView.vue'),
                        meta: {title: '账号管理'},

                    },
                    {
                        path: 'create',
                        name: 'createAccount',
                        component: () => import('@/views/accountSetting/appendInfo.vue'),
                        meta: {title: '新增用户'}
                    },
                    {
                        path: 'success',
                        name: 'createSuccess',
                        component: () => import('@/views/accountSetting/success.vue'),
                        meta: {title: '创建成功'}
                    }, {
                        path: 'edit/:index(.*)',
                        name: 'editAccount',
                        component: () => import('@/views/accountSetting/edit.vue'),
                        meta: {title: '编辑用户'}
                    }

                ]
            },
            {
                path: 'operator',
                name: 'operator',
                redirect: '/system/operator/list',
                children: [
                    {
                        path: 'list',
                        name: 'shopList',
                        component: () => import('@/views/operators/ListView.vue'),
                        meta: {title: '运营商管理'}

                    },
                    {
                        path: 'append',
                        name: 'appendShop',
                        component: () => import('@/views/operators/appendInfo.vue'),
                        meta: {title: '新增运营商'}
                    }
                ]
            }
        ]
    }
]
export default routes
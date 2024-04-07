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
                        path: 'success/:flag(.*)',
                        name: 'createSuccess',
                        component: () => import('@/views/accountSetting/success.vue'),
                        meta: {title: '创建成功'}
                    }, {
                        path: 'edit',
                        name: 'editAccount',
                        component: () => import('@/views/accountSetting/edit.vue'),
                        meta: {title: '编辑用户'}
                    }

                ]
            },
            {
                path: 'shop',
                name: 'shop',
                redirect: '/system/shop/list',
                children: [
                    {
                        path: 'list',
                        name: 'shopList',
                        component: () => import('@/views/shop/ListView.vue'),
                        meta: {title: '运营商管理'}

                    }, {
                        path: 'detail',
                        name: 'shopDetail',
                        component: () => import('@/views/shop/detail.vue'),
                        meta: {title: '运营商信息'}
                    },
                    {
                        path: 'append',
                        name: 'appendShop',
                        component: () => import('@/views/shop/appendInfo.vue'),
                        meta: {title: '新增运营商'}
                    },
                    {
                        path: 'edit',
                        name: 'editShop',
                        component: () => import('@/views/shop/edit.vue'),
                        meta: {title: '编辑'}
                    },
                    {
                        path: 'success/:flag(.*)',
                        component: () => import('@/views/shop/success.vue'),
                        meta: {title: '成功'}
                    }
                ]
            },
            {
                path: 'product',
                name: 'product',
                redirect: "/system/product/list",

                meta: {title: '产品管理'},
                children: [
                    {
                        path: 'list',
                        name: 'ProductList',
                        component: () => import('@/views/productManagement/ListView.vue')
                    },
                    {
                        path: 'appendInfo',
                        component: () => import('@/views/productManagement/appendInfo.vue'),
                        meta: {title: '新增产品'}
                    },
                    {
                        path: 'editInfo',
                        name: 'editInfo',
                        component: () => import('@/views/productManagement/EditInfo.vue'),
                        meta: {title: '编辑产品'}
                    },
                    {
                        path: 'success/:flag(.*)',
                        component: () => import('@/views/productManagement/success.vue'),
                        meta: {title: '成功'}
                    }
                ]
            },
            {
                path: 'upload',
                name: 'upload',
                component: () => import('@/views/upload/index.vue'),
                meta: {title: '上传管理'}
            },
            {
                name: 'tracingsourcecode',
                path: 'tracingsourcecode',
                component: () => import('@/views/tracingsourcecode/index.vue'),
                meta: {title: '申请溯源码'},
                path: 'warehouse',
                name: 'warehouse',
                redirect: '/system/warehouse/list',
                children: [
                    {
                        path: 'list',
                        name: 'warehouseList',
                        component: () => import('@/views/warehouse/ListView.vue'),
                        meta: {title: '仓库管理'}
                    },
                    {
                        path: 'detail',
                        name: 'warehouseDetail',
                        component: () => import('@/views/warehouse/detail.vue'),
                        meta: {title: '记录详情'}
                    }
                ]
            }
        ]
    }
]
export default routes
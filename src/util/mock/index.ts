import Mock from 'mockjs'

Mock.setup({
    timeout: 1000
})

Mock.mock('/login', function () {
    return Mock.mock({
        'code': 200,
        'msg': '账号密码错误',
        'result': {
            token: '123456789',
            userName: 'admin',
            password: '123456789'
        }
    })
})
Mock.mock('/set_user', function () {
    return Mock.mock({
        'code': 200,
        'msg': '注册成功',
        'result': {}
    })
})

Mock.mock('/get_menu', function () {
    return Mock.mock({
        'code': 200,
        'msg': '',
        'result': [
            {
                id: 1,
                parent_id: 0,
                icon: 'HomeOutlined',
                layout: 'App',
                label: '首页',
                name: 'welcome',
                key: 'welcome',
                meta: {
                    title: '首页'
                }
            },
            {
                id: 2,
                parent_id: 0,
                icon: 'BarChartOutlined',
                layout: 'App',
                label: '分析页',
                name: 'analysis',
                key: 'analysis',
                meta: {
                    title: '分析页'
                }
            },
            {
                id: 3,
                parent_id: 0,
                label: '权限页',
                icon: 'LockOutlined',
                layout: 'App',
                name: 'jurisdiction',
                key: 'jurisdiction',
                meta: {
                    title: '权限页'
                }
            },
            {
                id: 4,
                parent_id: 3,
                label: '用户权限',
                name: 'user_jurisdiction',
                layout: 'App',
                key: 'jurisdiction/user_jurisdiction',
                meta: {
                    title: '用户权限'
                }
            },
            {
                id: 5,
                parent_id: 3,
                label: '菜单权限',
                layout: 'App',
                name: 'menu_jurisdiction',
                key: 'jurisdiction/menu_jurisdiction',
                meta: {
                    title: '菜单权限'
                }
            },
            {
                id: 6,
                parent_id: 0,
                label: '外链',
                icon: 'PaperClipOutlined',
                layout: 'App',
                name: '',
                key: ''
            },
            {
                id: 7,
                parent_id: 6,
                label: '知乎',
                icon: 'ZhihuOutlined',
                layout: 'App',
                name: 'open',
                key: 'https://zhuanlan.zhihu.com/'
            },
            {
                id: 8,
                parent_id: 6,
                label: 'github',
                icon: 'GithubOutlined',
                layout: 'App',
                name: 'open',
                key: 'https://github.com/'
            },
            {
                id: 9,
                parent_id: 0,
                label: '文章管理',
                icon: 'LockOutlined',
                layout: 'App',
                name: 'article',
                key: 'article',
                meta: {
                    title: '文章管理'
                }
            },
            {
                id: 10,
                parent_id: 9,
                label: '文章编辑',
                icon: '',
                layout: 'App',
                name: 'edit_article',
                key: 'article/edit_article',
                meta: {
                    title: '文章编辑',
                    // params:[':id']
                }
            },
            {
                id: 11,
                parent_id: 9,
                label: '文章查看',
                icon: '',
                layout: 'App',
                name: 'manage_article',
                key: 'article/manage_article',
                meta: {
                    title: '文章查看'
                }
            },
        ]
    })
})

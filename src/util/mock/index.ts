import Mock from 'mockjs'
Mock.setup({
    timeout:1000
})

Mock.mock('/login',function(){
    return Mock.mock({
        'code':200,
        'msg':'账号密码错误',
        'result':{
            token:'123456789',
            userName:'admin',
            password:'123456789'
        }
    })
})
Mock.mock('/set_user',function(){
    return Mock.mock({
        'code':200,
        'msg':'注册成功',
        'result':{}
    })
})

Mock.mock('/get_menu',function(){
    return Mock.mock({
        'code':200,
        'msg':'',
        'result':[
            {
                id:1,
                parent_id:0,
                icon:'HomeOutlined',
                label:'首页',
                name:'welcome',
                key:'welcome',
                meta:{
                    title:'首页'
                }
            },
            {
                id:2,
                parent_id:0,
                icon:'BarChartOutlined',
                label:'分析页',
                name:'analysis',
                key:'analysis',
                meta:{
                    title:'分析页'
                }
            },
            {
                id:3,
                parent_id:0,
                label:'权限页',
                icon:'LockOutlined',
                name:'jurisdiction',
                key:'jurisdiction',
                meta:{
                    title:'权限页'
                }
            },
            {
                id:4,
                parent_id:3,
                label:'用户权限',
                name:'user_jurisdiction',
                key:'jurisdiction/user_jurisdiction',
                meta:{
                    title:'用户权限'
                }
            },
            {
                id:5,
                parent_id:3,
                label:'菜单权限',
                name:'menu_jurisdiction',
                key:'jurisdiction/menu_jurisdiction',
                meta:{
                    title:'菜单权限'
                }
            },
            {
                id:6,
                parent_id:0,
                icon:'AudioOutlined',
                label:'动态音效',
                name:'music',
                key:'music',
                meta:{
                    title:'动态音效'
                }
            }
        ]
    })
})

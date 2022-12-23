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
                label:'欢迎',
                key:'welcome'
            },
            {
                label:'分析页',
                key:'analysis'
            }

        ]
    })
})

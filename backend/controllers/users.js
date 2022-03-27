const usersModel = require('../models/users')
const Tools = require('../utils/tools')
const randomstring = require("randomstring");
//注册用户
const signup = async(req, res, next)=>{
    res.set('content-type', 'application/json;charset=utf-8')
    const {username, password} = req.body
    //密码加密
    console.log('pwd', password)
    const hashPwd = await Tools.hashStr(password)

    //检测数据库中是否存在
    let result = await usersModel.findUser(username)
    if(result) {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户已存在'
            })
        })
    }else {
        //不存在
        result = await usersModel.signup({username, password:hashPwd})
        // 载入模板
        res.render('success', {
            data: JSON.stringify({
                username,
                message: '注册成功'
            })
        })
    }
}
//获取用户列表
async function getlist(req, res, next) {
    res.set('content-type', 'application/json;charset=utf-8')
    const list = await usersModel.findList()
    res.render('success', {
        data: JSON.stringify(list)
    })
}

//删除用户
async function remove(req, res, next) {
    res.set('content-type', 'application/json;charset=utf-8')
    const {id} = req.body
    let result = await usersModel.remove(id)
    if(result) {
        res.render('success', {
            data: JSON.stringify({
                id,
                message: '删除成功'
            })
        })
    }else {
        res.render('fail', {
            data: JSON.stringify({
                message: '删除失败'
            })
        })
    }
}

//登录
async function signin(req, res, next) {
    res.set('content-type', 'application/json;charset=utf-8')
    let {username, password} = req.body
    let result = await usersModel.findUser(username)
    if(result) {
        let pwd = result.password
        //验证密码
        const check = await Tools.compare(password, pwd)
        if(check) {
            //设置cookie
            // const sessionId = randomstring.generate()
            // res.set('Set-Cookie', `session=${sessionId}; Path=/; HttpOnly`)

            // cookie-session
            req.session.username = username

            //第二种方式 token
            const token = Tools.sign(username)
            res.set('X-Access-Token', token)//行内自定义头部字段以x开头

            res.render('success', {
                data: JSON.stringify({
                    username,
                    message: '登录成功',
                })
            })
        }else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '密码错误',
                    username
                })
            })
        }
    }else {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户不存在',
                username
            })
        })
    }
}

//退出登录
function signout(req, res, next) {
    res.set('content-type', 'application/json;charset=utf-8')
    //cookie-session
    //To destroy a session simply set it to null:
    req.session = null
    res.render('success', {
        data: JSON.stringify({
            message: '退出登录'
        })
    })
}

//权限检查
function isAuth(req, res, next) {
    res.set('content-type', 'application/json;charset=utf-8')
    //cookie session方式
    let username = req.session.username
    let auth = req.session.username
    //token方式
    const token = req.get('X-Access-Token')
    try{
        auth = Tools.verify(token)
        username = auth.username
        console.log(auth)
    }catch(e) {
        auth = false
    }
    
    if(auth) {
        res.render('success', {
            data: JSON.stringify({
                username: username,
                message: '已登录'
            })
        })
    }else {
        res.render('fail', {
            data: JSON.stringify({
                message: '登录失效，请登录',
            })
        })
    }
}

module.exports = {
    signup,
    list: getlist,
    remove,
    signin,
    signout,
    isAuth
}
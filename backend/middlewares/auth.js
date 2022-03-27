const Tools = require('../utils/tools')
/*
    中间件，处理逻辑之前的验证
*/
function auth(req, res, next) {
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
        next()
    }else {
        res.render('fail', {
            data: JSON.stringify({
                message: '登录失效，请登录',
            })
        })
    }
}

module.exports = {
    auth
}
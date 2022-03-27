import signinTpl from '../views/signin.art'
import signinModel from '../models/signin'
const htmlSignIn = signinTpl({})

let signin = (req, res, next) => {
    //跳转到注册
    res.render(htmlSignIn)
    $('#form-signin').on('submit', _handleSignin)
}

let _handleSignin = function (e) {
    //处理登录跳转
    e.preventDefault()//阻止action
    const query = $('#form-signin').serialize()
    signinModel.signin(query).then((res, textStatus, jqXHR)=>{
        //描述状态的字符串。还有 jqXHR（在jQuery 1.4.x的中，XMLHttpRequest） 对象
        //获取头部信息  token
        const token = jqXHR.getResponseHeader('X-Access-Token')
        if(token) {
            localStorage.setItem('lg-token', token)
        }
        console.log('token', token)
        if(res.ret) {
            window.router.go('/index')
        }else {
            console.log(res)
        }
    })
}

export {
    signin
}
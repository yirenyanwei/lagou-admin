import indexTpl from '../views/index.art'
import { auth as authModel } from '../models/auth'
import img_header from '../asserts/user2-160x160.jpg'
import pageheader from '../components/pageheader'
import signoutModel from '../models/signout'
let index = (req, res, next) => {
    //跳转到用户界面
    //二级路由需要用到 next() 方法传递下去，以及 res.subRoute() 生成二级页面渲染的节点
    const htmlIndex = indexTpl({
        subRouter: res.subRoute(),
        img_header
    })
    next(htmlIndex)
    // res.render(htmlIndex)
    resizeWindow()
    //pageheader
    pageheader()
    //登出
    _signout()
    
    //绑定事件
    $('#sidebar-menu li:not(:first-child)').on('click', function(){
        const url = $(this).attr('to')
        router.go(url)
        // $(this).addClass('active').siblings().removeClass('active')
    })
    let hash = location.hash.slice(1)
    $(`#sidebar-menu li[to='${hash}']`).addClass('active').siblings().removeClass('active')

    //_connectSocket
    _connectSocket()
}

let resizeWindow = function () {
    //手动触发窗口resize事件
    if(document.createEvent) {
        var event = document.createEvent("HTMLEvents");
        event.initEvent("resize", true, true);
        window.dispatchEvent(event);
    } else if(document.createEventObject) {
        window.fireEvent("onresize");
    }
}

//登出
function _signout() {
    $('#users-signout').on('click', function (e) {
        e.preventDefault()//阻止action
        signoutModel.signout().then(function () {
            localStorage.setItem('lg-token', '')//清空token
            router.go('/signin')
        })
    })
}

//socket
function _connectSocket() {
    var socket = io.connect('http://localhost:3000');
    //收到后端自定义事件
    socket.on('sendMsg', function(msg){
        console.log('socket-', msg)
        let num = $('#icon_email').text()
        $('#icon_email').text(parseInt(num)+1)
    })
}

let isAuth = (req, res, next) => {
    authModel().then((ret)=>{
        let url = req.url
        console.log('isAuth', url)
        if(ret.ret) {
            router.go('/index/users', {})
        }else {
            router.go('/signin', {})
        }
    })
}

export {
    index, 
    isAuth
}
import indexTpl from '../../views/index.art'
import usersTpl from '../../views/users.art'
import usersListTpl from '../../views/users-list.art'
import Events from '../../databus/events'
import Page from '../../databus/page'
import {pagination} from '../../components/pagination'
import UsersAdd from './add-uers'
import { auth as authModel } from '../../models/auth'
import usersListModel from '../../models/users-list'
import usersRemoveModel from '../../models/users-remove'
import signoutModel from '../../models/signout'
//加载template
const htmlIndex = indexTpl({})
const htmlUsers = usersTpl({})
let listData = {}//用户数据

let index = (req, res, next) => {
    //跳转到用户界面
    res.render(htmlIndex)
    resizeWindow()
    //填充用户列表
    $('#main-content').html(htmlUsers)
    //添加用户
    UsersAdd.loadUsersAdd()
    //添加列表
    _dealUserList()
    //绑定remove
    _removeUser()
    //登出
    _signout()
    //注册事件
    _subscribe()
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

function _subscribe(){
    $('#main-content').on(Events.ChangeCurPage, (event, idx)=>{
        _list()
    })
    $('#main-content').on(Events.LoadListData, (event, idx)=>{
        _loadListData()
    })
}

//用户列表
function _dealUserList(){
    pagination.bindPageEvents()
    Page.currentPage = 1
    _loadListData()
}
//加载用户数据
function _loadListData() {
    usersListModel.usersList().then(function (res) {
        console.log('list', res)
        if(res.ret) {
            listData = res
            Page.totalSize = res.data.length
            Page.currentPage = Math.min(Page.currentPage, Math.ceil(Page.totalSize/Page.pageSize))
            _list()
            pagination.renderPage()
        }
    })
}

//渲染列表
function _list() {
    let res = listData
    let start = (Page.currentPage-1)*Page.pageSize
    let html = usersListTpl({
        data: res.data.slice(start, start+Page.pageSize)
    })
    $('#users-list').html(html)
}

//绑定remove事件
function _removeUser() {
    $('#users-list').on('click', '.btn-user-remove', function(){
        let data = {
            id: $(this).data('id')
        }
        usersRemoveModel.usersRemove(data).then(function (res) {
            _loadListData()
        })
    })
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

let isAuth = (req, res, next) => {
    authModel().then((ret)=>{
        if(ret.ret) {
            router.go('/index', {})
        }else {
            router.go('/signin', {})
        }
    })
}

export {
    index,
    isAuth,
}
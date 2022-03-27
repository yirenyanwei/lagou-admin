
import Events from "../../databus/events"
import Page from "../../databus/page"
import UsersAddTpl from "../../views/users-add.art"
import usersAddModel from "../../models/users-add"

function loadUsersAdd() {
    $('#main-content').append(UsersAddTpl())
    //添加用户回调
    $('#user-save').on('click', _handleSignup)
}
function _handleSignup() {
    //处理添加用户
    let btn_close = $('#user-close')
    btn_close.click()//关闭
    const query = $('#user-form').serialize()
    usersAddModel.usersAdd(query).then(function (res) {
        console.log('/api/users/siginup', res)
        Page.currentPage = 1
        $('#main-content').trigger(Events.LoadListData)
    })
}
export default {
    loadUsersAdd
}
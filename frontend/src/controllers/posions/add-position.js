
import Events from "../../databus/events"
import positionAddTpl from '../../views/positions-add.art'
import positionsAddModel from "../../models/positions-add"
import Page from "../../databus/page"

function loadPositionsAdd() {
    $('#main-content').append(positionAddTpl())
    //添加用户回调
    $('#position-save').on('click', _handleSignup)
}
function _handleSignup() {
    //处理添加用户
    let btn_close = $('#position-close')
    btn_close.click()//关闭
    const query = $('#position-form').serialize()
    positionsAddModel.positionsAdd(query).then((res)=>{
        if(res.ret) {
            Page.currentPage = 1
            $('#main-content').trigger(Events.LoadListData)
        }
    })
}
export default {
    loadPositionsAdd
}
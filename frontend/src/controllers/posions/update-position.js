
import Events from "../../databus/events"
import positionUpdateTpl from '../../views/positions-update.art'
import positionUpdateFormTpl from '../../views/positions-update-form.art'
import positionsModel from "../../models/positions"
import Page from "../../databus/page"

function bindPositionUpdate() {
    $('#position-update-window').append(positionUpdateTpl())
    //添加编辑回调
    $('#position-save-update').on('click', _handleUpdate)

    $('#positions-list').off('click').on('click', '.btn-position-update', function (e) {
        loadPositionsUpdate($(this).data('id'))
    })
}

function loadPositionsUpdate(id) {
    positionsModel.positionFindOne(id).then(function(res){
        console.log(res)
        $('#position-form-update').html(positionUpdateFormTpl({data: res.data}))
    })
}
function _handleUpdate() {
    //处理修改用户
    let btn_close = $('#position-close-update')
    btn_close.click()//关闭
    const query = $('#position-form-update').serialize()
    // 通过jquery.form发送请求
    positionsModel.positionUpdate(query).then((res)=>{
        if(res.ret) {
            Page.currentPage = 1
            $('#main-content').trigger(Events.LoadListData)
        }
    })
}
export default {
    bindPositionUpdate
}
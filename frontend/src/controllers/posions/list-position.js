import positionsTpl from '../../views/positions.art'
import positionsListTpl from '../../views/positions-list.art'
import PositionsAdd from './add-position'
import Page from '../../databus/page'
import {pagination} from '../../components/pagination'
import positionsListModel from '../../models/positions-list'
import Events from '../../databus/events'
import positionsModel from '../../models/positions'
var listData = {}//列表
function listPosition(req, res, next) {
    next()//加到sub节点上
    res.render(positionsTpl())
    //添加按钮
    PositionsAdd.loadPositionsAdd()
    //用户列表
    _dealPositionList()
    //绑定remove
    _removePosition()
    //消息
    _subscribe()
}

function _subscribe(){
    $('#main-content').off(Events.ChangeCurPage)//解绑
    $('#main-content').on(Events.ChangeCurPage, (event, idx)=>{
        _list()
    })
    $('#main-content').on(Events.LoadListData, (event, idx)=>{
        _loadListData()
    })
}

function _dealPositionList(){
    pagination.bindPageEvents()
    Page.currentPage = 1
    _loadListData()
}

function _loadListData() {
    positionsListModel.positionsList().then(function(res){
        console.log('positions-list', res)
        if(res.ret) {
            listData = res
            Page.totalSize = res.data.length
            Page.currentPage = Math.min(Page.currentPage, Math.ceil(Page.totalSize/Page.pageSize))
            _list()
            pagination.renderPage()
        }
    })
}

function _list() {
    let start = (Page.currentPage-1)*Page.pageSize
    let html = positionsListTpl({
        data:listData.data.slice(start, start+Page.pageSize)
    })
    $('#positions-list').html(html)
}

//绑定remove事件
function _removePosition() {
    $('#positions-list').on('click', '.btn-position-remove', function(){
        let data = {
            id: $(this).data('id')
        }
        positionsModel.positionsRemove(data).then(function (res) {
            _loadListData()
        })
    })
}

export {
    listPosition
}
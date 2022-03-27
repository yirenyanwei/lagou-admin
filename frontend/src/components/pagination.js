import usersListPageTpl from '../views/users-pages.art'
import Events from '../databus/events'
import Page from '../databus/page'

//绑定事件
function _bindPageEvents() {
    //绑定page事件 排除第一个，最后一个
    $('#users-pages').on('click', '#users-pages-list li:not(:first-child,:last-child)', function(){
        let index = $(this).index()
        Page.currentPage = index
        _pageActive()
        $('#main-content').trigger(Events.ChangeCurPage)
    })
    $('#users-pages').on('click', '#users-pages-list li:first-child', function(){
        Page.currentPage--
        Page.currentPage = Math.max(1, Page.currentPage)
        _pageActive()
        $('#main-content').trigger(Events.ChangeCurPage)
    })
    $('#users-pages').on('click', '#users-pages-list li:last-child', function(){
        Page.currentPage++
        let maxPage = Math.ceil(Page.totalSize/Page.pageSize)
        Page.currentPage = Math.min(Page.currentPage, maxPage)
        _pageActive()
        $('#main-content').trigger(Events.ChangeCurPage)
    })
}
//渲染分页
function _renderPage() {
    let total = Page.totalSize
    let pageCount = Math.ceil(total/Page.pageSize)//y页数
    let html = usersListPageTpl({
        pageCount
    })
    $('#users-pages').html(html)
    _pageActive()
}
//页签高亮
function _pageActive() {
    $('#users-pages-list li:not(:first-child,:last-child)')
    .eq(Page.currentPage-1).addClass('active')
    .siblings().removeClass('active')
}
export let pagination = {
     bindPageEvents:_bindPageEvents,
     renderPage:_renderPage,
     pageActive:_pageActive
}
//获取列表
function positionsList() {
    return $.ajax({
        url: '/api/positions/list',
        type: 'get',
        headers: {
            //往后端传header
            'X-Access-Token': localStorage.getItem('lg-token') || ''
        },
        success(res) {
            
        }
    })
}
const positionsListModel = {
    positionsList
}
export default positionsListModel
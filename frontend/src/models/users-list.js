//获取列表
function usersList() {
    return $.ajax({
        url: '/api/users',
        type: 'get',
        headers: {
            //往后端传header
            'X-Access-Token': localStorage.getItem('lg-token') || ''
        },
        success(res){
            
        }
    })
}
const usersListModel = {
    usersList
}
export default usersListModel
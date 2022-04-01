function positionsRemove(data) {
    return $.ajax({
        url: '/api/positions',
        type: 'delete',
        headers: {
            //往后端传header
            'X-Access-Token': localStorage.getItem('lg-token') || ''
        },
        data: data,
        success(ret) {
            

        }
    })
}
const positionsModel = {
    positionsRemove
}
export default positionsModel
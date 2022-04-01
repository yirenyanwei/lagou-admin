function positionsAdd(query) {
    return $.ajax({
        url:'/api/positions/add',
        type: 'post',
        data: query,
        headers: {
            //往后端传header
            'X-Access-Token': localStorage.getItem('lg-token') || ''
        },
        success(res){
            
        }
    })
}
const positionsAddModel = {
    positionsAdd
}
export default positionsAddModel
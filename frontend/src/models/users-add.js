function usersAdd(query) {
    return $.ajax({
        // url:'http://localhost:3000/api/users/signup',//cros跨域
        url:'/api/users',
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
const usersAddModel = {
    usersAdd
}
export default usersAddModel
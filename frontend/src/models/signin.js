//登录
function signin(query) {
    return $.ajax({
        // url:'http://localhost:3000/api/users/signup',//cros跨域
        url:'/api/users/signin',
        type: 'post',
        data: query,
        success(res, textStatus, jqXHR){
        }
    })
}
const signinModel = {
    signin
}
export default signinModel
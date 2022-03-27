//守卫路由
export function auth() {
    return $.ajax({
        url:'/api/users/isAuth',
        headers: {
            //往后端传header
            'X-Access-Token': localStorage.getItem('lg-token') || ''
        },
        success(ret) {
            //不会走
        }
    })
}
function signout() {
    return $.ajax({
        url: '/api/users/signout',
        type: 'get',
        headers: {
            //往后端传header
            'X-Access-Token': localStorage.getItem('lg-token') || ''
        },
        success(res){
            // location.reload()
            
        }
    })
}

const signoutModel = {
    signout
}
export default signoutModel
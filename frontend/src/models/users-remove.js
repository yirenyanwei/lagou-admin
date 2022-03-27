function usersRemove(data) {
    return $.ajax({
        url: '/api/users',
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

const usersRemoveModel = {
    usersRemove
}
export default usersRemoveModel
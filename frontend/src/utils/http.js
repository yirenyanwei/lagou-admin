function http({url, type='get', data = {}}) {
    return new Promise((resolve, reject)=>{
        $.ajax({
            url,
            type,
            data,
            headers: {
                //往后端传header
                'X-Access-Token': localStorage.getItem('lg-token') || ''
            },
            success(res, textStatus, jqXHR){
                resolve(res, textStatus, jqXHR)
            },
            error(err) {
                reject(err)
            }
        })
    })
}

export default http
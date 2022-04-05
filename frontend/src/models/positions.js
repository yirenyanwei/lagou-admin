function positionsRemove(data) {
    return $.ajax({
        url: '/api/positions/remove',
        type: 'delete',
        headers: {
            //往后端传header
            'X-Access-Token': localStorage.getItem('lg-token') || ''
        },
        data: data
    })
}

function positionFindOne(id) {
    return $.ajax({
        url: '/api/positions/listone',
        type: 'post',
        data: {id},
        headers: {
            //往后端传header
            'X-Access-Token': localStorage.getItem('lg-token') || ''
        },
    })
}

function positionUpdate(data) {
    //解决图片二进制的传输问题 jquery.form
    return new Promise(function (resolve, reject) {
        let options = {
            // target : '#output',    // 把服务器返回的内容放入id为output的元素中
            // beforeSubmit : showRequest,    // 提交前的回调函数
            success : (res)=>{
                resolve(res)
            },    // 提交后的回调函数
            error: (err)=>{
                reject(err)
            },//提交失败执行的回调函数
            url : '/api/positions/update',    //默认是form的action，如果申明，则会覆盖
            type : 'patch',    // 默认值是form的method("GET" or "POST")，如果声明，则会覆盖
            dataType : 'json',    // html（默认）、xml、script、json接受服务器端返回的类型
            // clearForm : true,    // 成功提交后，清除所有表单元素的值
            resetForm : true,    // 成功提交后，重置所有表单元素的值
            timeout : 3000    // 限制请求的时间，当请求大于3秒后，跳出请求
        }
        $('#position-form-update').ajaxSubmit(options)
    })
}
const positionsModel = {
    positionsRemove,
    positionUpdate,
    positionFindOne
}
export default positionsModel
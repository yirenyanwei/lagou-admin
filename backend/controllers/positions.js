const positionModel = require('../models/positions')
const moment = require('moment')
async function add(req, res, next) {
    let data = {
        ...req.body
    }
    data.createTime = moment().format('YYYY年MM月DD日 HH:mm:ss'); // March 31st 2022, 6:52:42 pm
    let result = await positionModel.add(data)
    console.log(result)
    if(result) {
        res.render('success', {
            data: JSON.stringify({
                message: '职位添加成功'
            })
        })
    }else {
        res.render('fail', {
            data: JSON.stringify({
                message: '职位添加失败'
            })
        })
    }
}

async function list(req, res, next) {
    let result = await positionModel.list()
    if(result) {
        res.render('success', {
            data: JSON.stringify(result)
        })
    }else {
        res.render('fail', {
            data: JSON.stringify({
                message: '职位查找失败'
            })
        })
    }
}

module.exports = {
    add,
    list
}
const positionModel = require('../models/positions')
const moment = require('moment')
const fs = require('fs')
const path = require('path')
const global = require('../utils/global')

async function add(req, res, next) {
    /*
    multer插件
    {
        fieldname: 'companyLogo',
        originalname: 'lagou.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '/Users/yanwei/Documents/Projects/HTMLProject/node.js/lagou-admin/backend/public/uploads',
        filename: 'companyLogo-1649076602342.jpeg',
        path: '/Users/yanwei/Documents/Projects/HTMLProject/node.js/lagou-admin/backend/public/uploads/companyLogo-1649076602342.jpeg',
        size: 25468
    }
    */
    let file = req.file || {filename: ''}
    let data = {
        ...req.body,
        companyLogo: file.filename
    }
    data.createTime = moment().format('YYYY年MM月DD日 HH:mm:ss'); // March 31st 2022, 6:52:42 pm
    let result = await positionModel.add(data)
    console.log(result)
    if(result) {
        global.socket.emit('sendMsg', {num: 10})
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

async function remove(req, res, next) {
    let query = req.body
    let result = null
    try {
        result = await positionModel.remove(query.id)
    } catch (error) {
        result = {
            deletedCount: 0
        }
    }
    /**
     * {
	"acknowledged": true,
	"deletedCount": 1
    }
     */
    if(result.deletedCount>0) {
        res.render('success', {
            data: JSON.stringify({
                message: '职位删除成功'
            })
        })
    }else{
        res.render('fail', {
            data: JSON.stringify({
                message: '职位删除失败'
            })
        })
    }
}

async function update(req, res, next) {
    let file = req.file
    let data = {
        ...req.body,
    }
    if(file) {
        //删除上一张图片
        let one = await positionModel.findOne(req.body.id)
        if(one) {
            fs.unlink(path.resolve(__dirname, '../public/uploads/'+one.companyLogo), function (err) {
                if(err) return console.log(err)
            })
        }
        data.companyLogo = file.filename//通过Multer中间件取
    }else {
        delete data.companyLogo
    }
    // data.createTime = moment().format('YYYY年MM月DD日 HH:mm:ss'); // March 31st 2022, 6:52:42 pm
    let result = await positionModel.update(data)
    console.log(result)
    if(result) {
        res.render('success', {
            data: JSON.stringify({
                message: '职位编辑成功'
            })
        })
    }else {
        res.render('fail', {
            data: JSON.stringify({
                message: '职位编辑失败'
            })
        })
    }
}

async function listone(req, res, next) {
    console.log(req.body)
    let result = await positionModel.findOne(req.body.id)
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
    list,
    remove,
    update,
    listone
}
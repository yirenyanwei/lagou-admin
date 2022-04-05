/**
 * 上传文件
 */
const path = require('path')
const multer  = require('multer')
const mime = require('mime')

const fileSize = 200

//基础版本
// const upload = multer({ dest: path.resolve(__dirname, '../public/uploads/')})

//storage版本
const storage = multer.diskStorage({
    //destination 是用来确定上传的文件应该存储在哪个文件夹中。也可以提供一个 string (例如 '/tmp/uploads')。如果没有设置 destination，则使用操作系统默认的临时文件夹。
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../public/uploads/'))//第一个参数是错误信息
    },
    //filename 用于确定文件夹中的文件名的确定。 如果没有设置 filename，每个文件将设置为一个随机文件名，并且是没有扩展名的。
    filename: function (req, file, cb) {
        //file mimetype	文件的 MIME 类型
        let filename = file.fieldname + '-' + Date.now() + '.' + mime.getExtension(file.mimetype)
      cb(null, filename)
    }
})

//限制条件
let limits = {
    fileSize: fileSize*Math.pow(1024, 1),//200k
    files: 1
}

//过滤
function fileFilter (req, file, cb) {

    // 这个函数应该调用 `cb` 用boolean值来
    // 指示是否应接受该文件
  
    // 拒绝这个文件，使用`false`，像这样:
    // cb(null, false)
  
    // 接受这个文件，使用`true`，像这样:
    // cb(null, true)

    const includes = {
        'image/png': true,
        'image/jpg': true,
        'image/jpeg': true,
        'image/gif': true,
    }
    let mimeType = file.mimetype
    if(!includes[mimeType]) {
        // 如果有问题，你可以总是这样发送一个错误:
        cb(new Error('文件必须是图片类型'))
    }else {
        cb(null, true)
    }
  
}
  
const _upload = multer({ 
    storage: storage, 
    limits,
    fileFilter 
}).single('companyLogo')

// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//     // req.file 是 `avatar` 文件的信息
//     // req.body 将具有文本域数据，如果存在的话
// })

//捕获错误
function upload(req, res, next) {
    _upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // 发生错误
        console.log('err1')
        res.render('fail', {
            data: JSON.stringify({
                message: err.message
            })
        })
        return
      } else if (err) {
        // 发生错误
        console.log('err2')
        res.render('fail', {
            data: JSON.stringify({
                message: err.message
            })
        })
        return
      }
  
      // 一切都好
      next()
    })
  }

module.exports = upload
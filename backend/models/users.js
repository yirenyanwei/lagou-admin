const{Users} = require('../utils/db')

//查找
function findUser(username) {
    return Users.findOne({username})
}
//查找所有
function findList() {
    //按id倒序
    return Users.find().sort({_id: -1})
}

//插入
function signup({username, password}) {
    let users = new Users({
        username,
        password
    })
    return users.save((err, data)=>{
        if(err) return console.log(err)
    })
}

//删除
function remove(id) {
    return Users.deleteOne({_id:id})
}

exports.signup = signup
exports.findUser = findUser
exports.findList = findList
exports.remove = remove
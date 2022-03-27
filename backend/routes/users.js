var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users')
const {auth} = require('../middlewares/auth')

/* POST users listing. */
//添加
router.post('/', auth, usersController.signup);
//获取用户列表
router.get('/', auth, usersController.list)
//删除用户
router.delete('/', auth, usersController.remove)
//登录
router.post('/signin', usersController.signin)
//登出
router.get('/signout', auth, usersController.signout)
//判断权限
router.get('/isAuth', usersController.isAuth)

module.exports = router;

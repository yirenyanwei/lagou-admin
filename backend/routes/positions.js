var express = require('express');
var router = express.Router();
var positionsCtrl = require('../controllers/positions')
var upload = require('../middlewares/upload')

router.post('/add', upload, positionsCtrl.add)//companyLogo为前端表单域的名字
router.get('/list', positionsCtrl.list)
router.post('/listone', positionsCtrl.listone)
router.delete('/remove', positionsCtrl.remove)
router.patch('/update', upload, positionsCtrl.update)

module.exports = router
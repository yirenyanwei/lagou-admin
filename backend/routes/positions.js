var express = require('express');
var router = express.Router();
var positionsCtrl = require('../controllers/positions')

router.post('/add', positionsCtrl.add)
router.get('/list', positionsCtrl.list)

module.exports = router
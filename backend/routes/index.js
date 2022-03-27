var express = require('express');
var router = express.Router();

/* GET home page.  test 接口*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

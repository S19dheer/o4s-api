var express = require('express');
var router = express.Router();
var productController = require("../controllers/productController");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/checkProduct',productController.checkProduct);

module.exports = router;

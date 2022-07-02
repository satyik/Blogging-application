var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');

/* GET home page. */

router.get("/", indexController.findallarticle);

module.exports = router;



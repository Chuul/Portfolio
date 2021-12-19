var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));
var Item = require('./itemSchema');

router.post('/', function(req, res, next) {
  console.log('server ' + req.body.name);
  Item.create({
    category : req.body.category, 
    name : req.body.name,
    checked : req.body.checked, 
    url : req.body.url,
    urlCheck : req.body.urlCheck,
    pos : req.body.pos,
    posCheck : req.body.posCheck,
    filtered : req.body.filtered,
  })
});
module.exports = router;

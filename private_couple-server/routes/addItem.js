var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));
var Item = require('./itemSchema');

router.post('/', async function(req, res, next) {
  try {
    const doc = await Item.create({
      category : req.body.category, 
      name : req.body.name,
      checked : req.body.checked, 
      url : req.body.url,
      urlCheck : req.body.urlCheck,
      pos : req.body.pos,
      posCheck : req.body.posCheck,
      filtered : req.body.filtered,
    });
    res.status(201).json({ data: doc });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).send({ message: 'Duplicated Data', error });
    }
    res.status(400).send({ message: 'sth wrong', error });
  }
});
module.exports = router;

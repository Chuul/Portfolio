const express= require('express');
const addItem = require('../schemas/addItemSchema');

const router = express.Router();

router.route('/')
  .get(async(req, res, next) => {
    try {
      const items = await addItem.find({});
      res.json(items);
    } catch (err) {
      console.log(err);
      next(err);
    }
  })
  .post(async(req, res, next) => {
    try {
      const item = await addItem.create({
        category: req.body.category,
        name: req.body.name,
        url: req.body.url,
        pos: req.body.pos
      });
      // res.redirect('/creating');
      console.log('DB에 들어가는 오브젝트: ', item);
      res.status(201).json(item)
    } catch (err) {
      console.log(err);
      next(err)
    }
  });

module.exports = router;
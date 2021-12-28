const express= require('express');
const item = require('../schemas/itemSchema');

const router = express.Router();

router.route('/')
  .get(async(req, res, next) => {
    try {
      const items = await item.find({});
      res.json(items);
    } catch (err) {
      console.log(err);
      next(err);
    }
  })
  .post(async(req, res, next) => {
    try {
      const items = await item.create({
        category: req.body.category,
        name: req.body.name,
        url: req.body.url,
        pos: req.body.pos
      });
      // console.log('DB에 들어가는 오브젝트: ', items);
      res.status(201).json(items)
    } catch (err) {
      console.log(err);
      next(err)
    }
  })
  .delete(async(req, res, next) => {
    try {
      const result = await item.remove({name: req.body.name });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })

router.patch('/:id', async (req, res, next) => {
  try {
    console.log('req.body: ', req.body);
    const result = await item.update({
      _id: req.body.id,
    }, {
      url: req.body.urlText,
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
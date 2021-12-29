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
  

router.route('/:id')
  .delete(async(req, res, next) => {
    try {
      const result = await item.remove({_id: req.params.id})
      res.json(result);
    } catch (err) {
      console.log(err);
      next(err);
    }
  })
  .patch(async(req, res, next) => {
    try {
      console.log('req.params: ', req.params);
      console.log('req.body: ', req.body.data);
      const result = await item.updateOne({
        _id: req.params.id
      }, {
        url: req.body.data.urlText
      });
      res.json(result);
    } catch (err) {
      console.log(err);
      next(err);
    }
  })

module.exports = router;
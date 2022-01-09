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
        pos: req.body.pos,
        pos: req.body.pos,
        pos_latlng: req.body.pos_latlng
      });
      res.status(201).json(items)
    } catch (err) {
      console.log(err);
      next(err)
    }
  })

router.delete('/:id', async(req, res, next) => {
  try {
    const result = await item.remove({_id: req.params.id})
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

router.patch('/url/:id', async(req, res, next) => {
  try {
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
router.patch('/pos/:id', async(req, res, next) => {
  try {
    const result = await item.updateOne({
      _id: req.params.id
    }, {
      pos: req.body.data.posText
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

router.get('/list', async(req, res, next) => {
  try {
    const list = await item.find({checked: true});
    res.json(list);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

module.exports = router;
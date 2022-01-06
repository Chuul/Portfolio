const express= require('express');
const start = require('../schemas/startSchema');

const router = express.Router();

router.route('/')
  .post(async(req, res, next) => {
    try {
      const result = await start.remove({})
      res.json(result);
      const starts = await start.create({
        // name: new Date(),
        start: req.body, 
      });
      res.status(201).json(starts)
    } catch (err) {
      console.log(err);
      next(err)
    }
  })
  .get(async(req, res, next) => {
    try {
      const list = await start.find({});
      res.json(list);
    } catch (error) {
      console.log(error);
      next(err);
    }
  })

router.patch('/comment/:id', async(req, res, next) => {
  try {
    // const list = await start.find({});
    const result = await start.updateOne({'start._id': req.params.id}, 
      {'$set': {'start.$.comment': req.body.data.comment}});
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.patch('/true/:id', async(req, res, next) => {
  try {
    const result = await start.updateOne({'start._id': req.params.id}, 
      {'$set': {'start.$.completed': true}});
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.patch('/false/:id', async(req, res, next) => {
  try {
    const result = await start.updateOne({'start._id': req.params.id}, 
      {'$set': {'start.$.completed': false}});
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
module.exports = router;
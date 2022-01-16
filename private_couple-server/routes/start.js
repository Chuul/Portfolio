const express= require('express');
const start = require('../schemas/startSchema');

const router = express.Router();

router.post('/', async(req, res, next) => {
  try {
    const starts = await start.find({
      createdBy: req.body.createdBy
    });
    res.json(starts);
  } catch (error) {
    console.log(error);
    next(err);
  }
})
router.post('/insert', async(req, res, next) => {
  try {
    const result = await start.remove({
      createdBy: req.body.createdBy
    })
    res.json(result);
    const starts = await start.create({
      createdBy: req.body.createdBy,
      course: req.body.course, 
    });
    res.status(201).json(starts)
  } catch (err) {
    console.log(err);
    next(err)
  }
})

router.patch('/comment/:id', async(req, res, next) => {
  try {
    // const list = await start.find({});
    const result = await start.updateOne({'course._id': req.params.id}, 
      {'$set': {'course.$.comment': req.body.data.comment}});
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.patch('/true/:id', async(req, res, next) => {
  try {
    const result = await start.updateOne({
      'course._id': req.params.id
    }, {
      '$set': {'course.$.completed': true}
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.patch('/false/:id', async(req, res, next) => {
  try {
    const result = await start.updateOne({'course._id': req.params.id}, 
      {'$set': {'course.$.completed': false}});
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.delete('/:id', async(req, res, next) => {
  try {
    const result = await start.updateOne({
      'course._id': req.params.id
    }, {
      '$pull' : {"course" : {"_id": req.params.id}}
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

router.patch('/url/:id', async(req, res, next) => {
  try {
    const result = await start.updateOne({
      'course._id': req.params.id
    }, {
      '$set': {'course.$.url': req.body.data.urlText}
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.patch('/pos/:id', async(req, res, next) => {
  try {
    const result = await start.updateOne({
      'course._id': req.params.id
    }, {
      '$set': {'course.$.pos': req.body.data.posText}
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
module.exports = router;
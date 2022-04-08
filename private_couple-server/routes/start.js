const express= require('express');
const start = require('../schemas/startSchema');

const router = express.Router();

router.post('/', async(req, res, next) => {
  try {
    const starts = await start.find({
      createdBy: req.body.createdBy
    });
    if (!starts) {
      return res.status(400).json({ message: '데이터를 찾을 수 없습니다' });
    }
    res.json(starts);
  } catch (error) {
    console.log(error);
    next(err);
  }
})
router.post('/insert', async(req, res, next) => {
  try {
    const start_delete = await start.deleteOne({
      createdBy: req.body.createdBy
    });
    if(!start_delete) {
      return res.status(400).json({ message: '데이터를 삭제할 수 없습니다' });
    }
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
    const result = await start.updateOne({
      'course._id': req.params.id
    }, 
    {
      '$set': {
        'course.$.comment': req.body.data.comment, 
        'course.$.checked': true
      }
    });
    if (!result) {
      return res.status(400).json({ message: '데이터를 업데이트할 수 없습니다' });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.patch('/false/:id', async(req, res, next) => {
  try {
    const result = await start.updateOne({
      'course._id': req.params.id
    }, 
    {
      '$set': {'course.$.checked': false}
    });
    if (!result) {
      return res.status(400).json({ message: '데이터를 업데이트할 수 없습니다' });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.delete('/item/:id', async(req, res, next) => {
  try {
    const result = await start.updateOne({
      'course._id': req.params.id
    }, {
      '$pull' : {"course" : {"_id": req.params.id}}
    });
    if (!result) {
      return res.status(400).json({ message: '데이터를 업데이트할 수 없습니다' });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.patch('/name/:id', async(req, res, next) => {
  try {
    const result = await start.updateOne({
      'course._id': req.params.id
    }, {
      '$set': {'course.$.name': req.body.data.urlText}
    });
    if (!result) {
      return res.status(400).json({ message: '데이터를 업데이트할 수 없습니다' });
    }
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
    if (!result) {
      return res.status(400).json({ message: '데이터를 업데이트할 수 없습니다' });
    }
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
    if (!result) {
      return res.status(400).json({ message: '데이터를 업데이트할 수 없습니다' });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.delete('/exit/:user', async(req, res, next) => {
  try {
    const result = await start.deleteOne({
      createdBy: req.params.user
    });
    if (!result) {
      return res.status(400).json({ message: '데이터를 식제할 수 없습니다' });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
module.exports = router;
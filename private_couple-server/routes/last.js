const express= require('express');
const last = require('../schemas/lastSchema');

const router = express.Router();

router.post('/', async(req, res, next) => {
  try {
    const lasts = await last.find({
      createdBy: req.body.createdBy
    });
    if (!lasts) {
      return res.status(400).json({ message: '데이터를 찾을 수 없습니다' });
    }
    res.json(lasts);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.patch('/item', async(req, res, next) => {
  const item = await last.find({
    createdBy: req.body.createdBy,
  })
  if(!item.length) {
    try {
      const lasts = await last.create({
        createdBy: req.body.createdBy,
        item: req.body.item
      })
      res.status(201).json(lasts);
    } catch (err) {
      console.log(err);
      next(err);
    }
  } else {
    try {
      const lasts = await last.updateOne({
        createdBy: req.body.createdBy
      }, { 
        $push: {item: req.body.item}
      });
      res.status(201).json(lasts)
    } catch (err) {
      console.log(err);
      next(err)
    }

  }
})
router.patch('/course', async(req, res, next) => {
  const item = await last.find({
    createdBy: req.body.createdBy
  })
  res.json(item);
  if(!item.length) {
    try {
      const lasts = await last.create({
        createdBy: req.body.createdBy,
        course: req.body.course
      })
      res.status(201).json(lasts);
    } catch (err) {
      console.log(err);
      next(err);
    }
  } else {
    try {
      const lasts = await last.updateOne({
        createdBy: req.body.createdBy
      }, { 
        $push: {course: req.body.course}
      });
      res.status(201).json(lasts)
    } catch (err) {
      console.log(err);
      next(err)
    }

  }
})

module.exports = router;
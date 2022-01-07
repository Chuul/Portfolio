const express= require('express');
const last = require('../schemas/lastSchema');

const router = express.Router();

router.get('/', async(req, res, next) => {
  try {
    const lasts = await last.find({});
    res.json(lasts);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.patch('/item', async(req, res, next) => {
  try {
    console.log('req.body:!!!!!!!!!!!!!', req.body);
    const lasts = await last.updateOne({
      name: 'item',
    }, { 
      $push: {item: req.body}
    });
    res.status(201).json(lasts)
  } catch (err) {
    console.log(err);
    next(err)
  }
})
router.patch('/course', async(req, res, next) => {
  try {
    console.log('req.body:!!!!!!!!!!!!!', req.body);
    const lasts = await last.updateOne({
      name: 'course',
    }, { 
      $push: {course: req.body}
    });
    res.status(201).json(lasts)
  } catch (err) {
    console.log(err);
    next(err)
  }
})

module.exports = router;
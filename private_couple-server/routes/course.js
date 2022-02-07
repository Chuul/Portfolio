const express= require('express');
const course = require('../schemas/courseSchema');

const router = express.Router();

router.post('/', async(req, res, next) => {
  try {
    const courses = await course.find({
      createdBy: req.body.email
    });
    if (!courses) {
      return res.status(400).json({ message: '데이터를 찾을 수 없습니다' });
    }
    res.json(courses);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.post('/insert', async(req, res, next) => {
  try {
    const courses = await course.create({
      name: new Date(),
      createdBy: req.body.createdBy,
      course: req.body.course, 
    });
    res.status(201).json(courses)
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.delete('/:name', async(req, res, next) => {
  try {
    const result = await course.deleteOne({name: req.params.name})
    if (!result) {
      return res.status(400).json({ message: '데이터를 삭제할 수 없습니다' });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

module.exports = router;
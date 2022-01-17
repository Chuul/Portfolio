const express= require('express');
const course = require('../schemas/courseSchema');

const router = express.Router();

router.post('/', async(req, res, next) => {
  try {
    const courses = await course.find({
      createdBy: req.body.email
    });
    res.json(courses);
  } catch (error) {
    console.log(error);
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
    next(err)
  }
})
router.delete('/:name', async(req, res, next) => {
  try {
    const result = await course.remove({name: req.params.name})
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

module.exports = router;
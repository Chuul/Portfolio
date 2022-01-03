const express= require('express');
const course = require('../schemas/courseSchema');

const router = express.Router();


router.post('/', async(req, res, next) => {
  try {
    console.log('req.body : ',req.body);
    const courses = await course.create({
      name: new Date(),
      course: req.body, 
    });
    res.status(201).json(courses)
  } catch (err) {
    console.log(err);
    next(err)
  }
})

module.exports = router;
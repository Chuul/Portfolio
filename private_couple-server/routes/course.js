const express= require('express');
const course = require('../schemas/courseSchema');

const router = express.Router();

router.route('/')
  .post(async(req, res, next) => {
    try {
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
  .get(async(req, res, next) => {
    try {
      const list = await course.find({});
      res.json(list);
    } catch (error) {
      console.log(error);
      next(err);
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
// router.patch('/:name', async(req, res, next) => {
//   try {
//     const bool = await course.find(req.params.name);
//     console.log('bool!!!!!: ', bool);
//     const result = await item.updateOne({
//       _id: bool._id
//     }, {
//       checked: !bool.checked
//     });
//     res.json(result);
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// })

module.exports = router;
const express= require('express');
const last = require('../schemas/lastSchema');

const router = express.Router();

router.post('/', async(req, res, next) => {
  try {
    const lasts = await last.find({
      createdBy: req.body.createdBy
    });
    res.json(lasts);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.patch('/item', async(req, res, next) => {
  console.log('req.body: ', req.body)
  const item = await last.find({
    createdBy: req.body.createdBy
  })
  if(this.item === []) {
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
      console.log('req.body!!!!!!!!!!!!:', req.body);
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
// router.patch('/course', async(req, res, next) => {
//   try {
//     const lasts = await last.updateOne({
//       name: 'course',
//     }, { 
//       $push: {course: req.body}
//     });
//     res.status(201).json(lasts)
//   } catch (err) {
//     console.log(err);
//     next(err)
//   }
// })

module.exports = router;
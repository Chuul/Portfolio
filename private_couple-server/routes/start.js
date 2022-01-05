const express= require('express');
const start = require('../schemas/startSchema');

const router = express.Router();

router.route('/')
  .post(async(req, res, next) => {
    try {
      const result = await start.remove({})
      res.json(result);
      const starts = await start.create({
        name: new Date(),
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
      console.log('list!!!!!!!!!!!!!!!!!!: ',list);
      res.json(list);
    } catch (error) {
      console.log(error);
      next(err);
    }
  })

module.exports = router;
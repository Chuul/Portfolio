const express= require('express');
const addItem = require('../schemas/addItemSchema');

const router = express.Router();

router.route('/')
  .get(async(req, res, next) => {
    try {
      const items = await addItem.find({});
      res.json(items);
      console.log("가져온 items : ", items);
    } catch (err) {
      console.log(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const items = await addItem.create({
        name: req.body.name,
      });
      console.log(items);
      res.status(201).json(items)
    } catch (err) {
      console.log(err);
      next(err)
    }
  });

module.exports = router;
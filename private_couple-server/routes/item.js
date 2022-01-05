const express= require('express');
const item = require('../schemas/itemSchema');

const router = express.Router();

router.route('/')
  .get(async(req, res, next) => {
    try {
      const items = await item.find({});
      res.json(items);
    } catch (err) {
      console.log(err);
      next(err);
    }
  })
  .post(async(req, res, next) => {
    try {
      const items = await item.create({
        category: req.body.category,
        name: req.body.name,
        // checked: req.body.checked,
        url: req.body.url,
        pos: req.body.pos
      });
      // console.log('DB에 들어가는 오브젝트: ', items);
      res.status(201).json(items)
    } catch (err) {
      console.log(err);
      next(err)
    }
  })

router.delete('/:id', async(req, res, next) => {
  try {
    const result = await item.remove({_id: req.params.id})
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

// router.patch('/checked/:id', async(req, res, next) => {
//   try {
//     const bool = await item.findById(req.params.id);
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
router.patch('/url/:id', async(req, res, next) => {
  try {
    const result = await item.updateOne({
      _id: req.params.id
    }, {
      url: req.body.data.urlText
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

router.patch('/pos/:id', async(req, res, next) => {
  try {
    const result = await item.updateOne({
      _id: req.params.id
    }, {
      pos: req.body.data.posText
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

router.get('/list', async(req, res, next) => {
  try {
    const list = await item.find({checked: true});
    console.log('list: ', list);
    res.json(list);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

module.exports = router;
const express= require('express');
const list = require('../schemas/listSchema');

const router = express.Router();

router.post('/', async(req, res, next) => {
  try {
    const result = await list.find({
      createdBy: req.body.username
    });
    if (!result) {
      return res.status(400).json({ message: '데이터를 찾을 수 없습니다' });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.post('/insert', async(req, res, next) => {
  try {
    const result = await list.create({
      name: new Date(),
      createdBy: req.body.createdBy,
      course: req.body.course, 
    });
    res.status(201).json(result)
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.delete('/:name', async(req, res, next) => {
  try {
    const result = await list.deleteOne({name: req.params.name})
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
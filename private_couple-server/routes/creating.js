const express= require('express');
const creating = require('../schemas/creatingSchema');

const router = express.Router();

router.post('/', async(req, res, next) => {
  try {
    const result = await creating.find({
      createdBy: req.body.username
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    if (error.code === 11000) {
      return res.status(400).json({ message: '데이터를 찾을 수 없습니다' });
    }
    next(err);
  }
})
router.post('/insert', async(req, res, next) => {
  try {
    const result = await creating.create({
      createdBy: req.body.createdBy,
      category: req.body.category,
      name: req.body.name,
      checked: req.body.checked,
      url: req.body.url,
      pos: req.body.pos,
      pos: req.body.pos,
      pos_latlng: req.body.pos_latlng
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    if(err.code === 11000) {
      return res.status(400).json({ message: '아이템이 중복됩니다', err });
    } 
    next(err);
  }
})
router.delete('/:id', async(req, res, next) => {
  try {
    const result = await creating.deleteOne({_id: req.params.id});
    if (!result) {
      return res.status(400).json({ message: 'DB에서 데이터를 삭제할 수 없습니다' });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.patch('/url/:id', async(req, res, next) => {
  try {
    const result = await creating.updateOne({
      _id: req.params.id
    }, {
      url: req.body.data.urlText
    });
    if (!result) {
      return res.status(400).json({ message: '데이터를 업데이트 할 수 없습니다' });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.patch('/pos/:id', async(req, res, next) => {
  try {
    const result = await creating.updateOne({
      _id: req.params.id
    }, {
      pos: req.body.data.posText
    });
    if (!result) {
      return res.status(400).json({ message: '데이터를 업데이트 할 수 없습니다' });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
router.get('/list', async(req, res, next) => {
  try {
    const list = await creating.find({checked: true});
    if (!list) {
      return res.status(400).json({ message: '데이터를 찾을 수 없습니다' });
    }
    res.json(list);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

module.exports = router;
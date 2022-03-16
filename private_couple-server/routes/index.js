const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../../private_couple/dist/index.html'))
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

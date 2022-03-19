const express = require('express');
const path = require('path');
const cors = require('cors');

const router = express.Router();
const whitelist = ["https://private-course.herokuapp.com"]
const corsOptions = {
  origin: function(origin, callback) {
    if(whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed Origin!"));
    }
  }
}

router.use(cors(corsOptions));

router.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

const express= require('express');
const login = require('../schemas/loginSchema');
const cors = require('cors');

let whitelist = ['https://private-course.herokuapp.com']
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const router = express.Router();

router.post('/', cors(corsOptions), async(req, res) => {
  const username = await login.findOne({username:req.body.username})
  if(!username) {
    try {
      const logins = await login.create({
        username: req.body.username,
        email: req.body.email,
      });
      res.status(201).json(logins)
    } catch (err) {
      console.log(err);
      next(err)
    }
  } else {
    res.json(username);
  }
})
module.exports = router;
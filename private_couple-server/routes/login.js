const express= require('express');
const login = require('../schemas/loginSchema');
// const cors = require('cors');

const router = express.Router();

router.options('/', cors())
router.post('/', cors(), async(req, res) => {
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
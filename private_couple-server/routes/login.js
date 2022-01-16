const express= require('express');
const login = require('../schemas/loginSchema');

const router = express.Router();

router.post('/', async(req, res) => {
  const username = await login.findOne({username:req.body.username})
  if(!username) {
    console.log('username없는데: ', username);
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
    console.log('username있는데: ', username);
    res.json(username);
  }
})
  // find the user
  // login.findOne({
  //   username: req.body.username,
  // })
  //   .then(login => {
  //     // non registered user
  //     console.log('login!!!!!!!!!!!!: ', login);
  //     if (!login) {
  //       const logins = user.create({
  //         username: req.body.username,
  //         email: req.body.email,
  //       });
  //       res.status(201).json(logins)
  //     }
      // bcrypt.compare(req.body.password, user.password, (error, result) => {
      //   if (error) {
      //     res.status(500).send('Internal Server Error');
      //   }
      //   if (result) {
      //     // create token with user info
      //     const token = newToken(user);

      //     // current logged-in user
      //     const loggedInUser = {
      //       username: user.username,
      //       nickname: user.nickname,
      //     };

      //     // return the information including token as JSON
      //     res.status(200).json({
      //       success: true,
      //       user: loggedInUser,
      //       message: 'Login Success',
      //       token: token,
      //     });
      //   } else {
      //     res.status(401).json('Authentication failed. Wrong password.');
      //   }
      // });
//     .catch(error => {
//       res.status(500).json('Internal Server Error');
//       throw error;
//     });
// });
  
// router.post('/signup', (req, res) => {
//   const { username, password, nickname } = req.body;
//   // encrypt password
//   // NOTE: 10 is saltround which is a cost factor
//   bcrypt.hash(password, 10, (error, hashedPassword) => {
//     if (error) {
//       console.log(error);
//       return res.status(500).json({
//         error,
//       });
//     } else {
//       const newUser = new UserModel({
//         username,
//         password: hashedPassword,
//         nickname,
//       });
//       newUser.save((error, saved) => {
//         if (error) {
//           console.log(error);
//           res.status(409).send(error);
//         } else {
//           console.log(saved);
//           res.send(saved);
//         }
//       });
//     }
//   });
// });
module.exports = router;
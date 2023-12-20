const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');

authRouter.post('/', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        let auth = await User.authUser(username, password);
        if (auth) {
          const msg = ` ${req.originalUrl} ${JSON.stringify(auth)}`;
          console.log(auth)
          res.status(200).json(auth);
        } else {
          throw new Error('Something went wrong, try again')
        }
      } catch (e) {
        res.status(400).json(e.toString());
    }
});

module.exports = authRouter;
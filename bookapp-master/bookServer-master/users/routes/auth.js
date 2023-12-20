const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');

authRouter.post('/', async (req, res) => {
    try {
        const usuario = req.body.username;
        const contraseña = req.body.password;
        let auth = await User.authUser(usuario, contraseña);
        if (auth) {
          res.status(200).json(auth);
        } else {
          throw new Error('Something went wrong, try again')
        }
      } catch (e) {
        res.status(400).json(e.toString());
    }
});

module.exports = authRouter;
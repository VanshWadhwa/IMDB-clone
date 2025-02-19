const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../db/helper/user');

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ msg: 'Incomplete data' });
      }
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(400).json({ msg: 'Incorrect email or password' });
      }
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        return res.status(400).json({ msg: 'Incorrect email or password' });
      }

      const token = jwt.sign({ id: user.user_id }, config.JWT_SECRET, {
        expiresIn: config.JWT_REFRESH_EXPIRATION,
      });

      return res.status(200).json({
        id: user.user_id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    } catch (error) {
      return res.status(500).json({
        msg: 'Internal Server Error',
      });
    }
  },
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      if (!email || !password || !username) {
        return res.status(400).json({ msg: 'Incomplete data' });
      }
      const userExists = await User.findByEmail(email);

      if (userExists) {
        return res.status(400).send('This is already a registered email.');
      }

      await User.create({ username, email, password });

      return res.status(200).json({ msg: 'Regesteration Successful' });
    } catch (error) {
      return res.status(500).json({
        msg: 'Internal Server Error',
      });
    }
  },
  protected: (req, res) => {
    try {
      if (res.locals.user) res.status(200).json({ user: res.locals.user });
      else {
        res.status(400).json({ msg: 'No User' });
      }
    } catch (error) {
      res.status(500).json({ msg: 'Internal server error' });
    }
  },
};

module.exports = authController;

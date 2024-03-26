const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../db/models/user');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.get('authorization');

    if (!token || token === '') {
      req.isAuth = false;
      return res.status(400).json({ msg: 'No Authorization' });
    }
    if (token) {
      jwt.verify(token, config.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          return res.status(401).json({
            msg: 'Invalid Authorization',
          });
        } else {
          const user = await User.findOne({
            where: {
              id: decodedToken.id,
            },
            attributes: {
              exclude: ['password', 'createdAt', 'updatedAt'],
            },
            raw: true,
          });
          res.locals.user = user;

          next();
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json();
  }
};

module.exports = authMiddleware;

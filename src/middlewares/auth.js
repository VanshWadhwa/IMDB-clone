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
    jwt.verify(token, config.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({
          msg: 'Invalid Authorization',
        });
      }

      const user = await User.findOne({
        where: {
          id: decodedToken.id,
        },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
        raw: true,
      });

      if (!user) {
        return res.status(401).json({
          msg: 'Invalid Authorization',
        });
      }
      res.locals.user = user;

      next();
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: 'Internal Server Error',
    });
  }
};

module.exports = authMiddleware;

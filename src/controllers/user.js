const User = require('../db/models/user');

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log(email, password);

      if (!email || !password) return res.status(400).json({ msg: 'Incomplete data' });

      const user = await User.create({ email, password });

      return res.status(201).json({ msg: 'account created', user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: 'Internal Server Error',
      });
    }
  },
};

module.exports = authController;

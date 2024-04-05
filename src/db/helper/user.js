const bcrypt = require('bcrypt');

const { user: User } = require('../models');
module.exports = {
  findById: async (id) => {
    const user = await User.findOne({
      where: {
        user_id: id,
      },
    });
    return user;
  },
  findByEmail: async (email) => {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  },
  create: async ({ username, email, password }) => {
    const salt = await bcrypt.genSalt();
    await User.create({
      username,
      email,
      password: await bcrypt.hash(password, salt),
    });
  },
};

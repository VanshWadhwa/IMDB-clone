const { list: List } = require('../models');
module.exports = {
  findById: async (id, options) => {
    const list = await List.findOne({
      where: {
        list_id: id,
        ...options,
      },
    });

    return list;
  },

  findByName: async (name, options) => {
    const list = await List.findOne({
      where: {
        name: name,
        ...options,
      },
    });
    return list;
  },

  findAllById: async (id, options) => {
    const list = await List.findAll({
      where: {
        user_id: id,
        ...options,
      },
    });
    return list;
  },
  create: async (name, user_id) => {
    const list = await List.create({ name: name, user_id: user_id });
    return list;
  },
};

const { list_item: ListItem } = require('../models');
module.exports = {
  findByListId: async (listId, options) => {
    const listItem = await ListItem.findOne({
      where: {
        list_id: listId,
        ...options,
      },
    });
    return listItem;
  },
  findAllByListId: async (listId) => {
    const listItems = await ListItem.findAll({
      where: {
        list_id: listId,
      },
    });
    return listItems;
  },
  findByContentId: async (contentId) => {
    const listItem = await ListItem.findOne({
      where: {
        item: contentId,
      },
    });
    return listItem;
  },

  create: async (contentId, contentName, listId) => {
    return await ListItem.create({
      item: contentId,
      name: contentName,
      list_id: listId,
    });
  },
  deleteAllByListId: async (listId) => {
    return await ListItem.destroy({
      where: {
        list_id: listId,
      },
    });
  },
};

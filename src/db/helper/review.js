const { review: Review } = require('../models');
module.exports = {
  findAllById: async (id) => {
    const reviews = await Review.findAll({
      where: {
        content_id: id,
      },
    });
    return reviews;
  },

  create: async (data, contentId, userId) => {
    return await Review.create({
      data: data,
      content_id: contentId,
      user_id: userId,
    });
  },
};

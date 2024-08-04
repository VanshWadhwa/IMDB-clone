const { user_rating: UserRating } = require('../models');
module.exports = {
  findById: async (id, options) => {
    const content_rating = await UserRating.findOne({
      where: {
        content_id: id,
        ...options,
      },
    });
    return content_rating;
  },

  create: async (rating, contentId, userId) => {
    return await UserRating.create({
      rating: rating,
      content_id: contentId,
      user_id: userId,
    });
  },
};

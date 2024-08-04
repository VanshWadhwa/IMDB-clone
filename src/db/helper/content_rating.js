const { content_rating: ContentRating } = require('../models');
module.exports = {
  findById: async (id) => {
    const content_rating = await ContentRating.findOne({
      where: {
        content_id: id,
      },
    });
    return content_rating;
  },
  findByContentId: async (id) => {
    const content_rating = await ContentRating.findOne({
      where: {
        content_id: id,
      },
    });
    return content_rating;
  },
  create: async (contentId, rating, noOfRating, totalRating) => {
    return await ContentRating.create({
      content_id: contentId,
      rating: rating,
      no_of_rating: noOfRating,
      total_rating: totalRating,
    });
  },

  update: async (contentRating, rating, no_of_rating, total_rating) => {
    return await contentRating.update({ rating, no_of_rating, total_rating });
  },
};

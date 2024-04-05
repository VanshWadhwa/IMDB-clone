const Review = require('./../db/helper/review');

const reviewController = {
  // create review
  createReview: async (req, res) => {
    try {
      const user = res.locals.user;
      const { data } = req.body;
      const { contentId } = req.params;

      if (!contentId || !data)
        return res.status(400).json({ msg: 'Missing field (data or contentId)' });

      const review = await Review.create(data, contentId, user.user_id);

      return res.status(200).json({ msg: 'Review successfully added', review: review });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },
};

module.exports = reviewController;

const Review = require('../db/models/review');

const reviewController = {
  // create review
  createReview: async (req, res) => {
    try {
      const user = res.locals.user;
      const { data } = req.body;
      const { contentId } = req.params;

      if (!contentId || !data)
        return res.status(400).json({ msg: 'Missing field (data or contentId)' });

      const review = await Review.create({
        data: data,
        contentId: contentId,
        UserId: user.id,
      });

      return res.status(200).json({ msg: 'Review successfully added', review: review });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },
};

module.exports = reviewController;

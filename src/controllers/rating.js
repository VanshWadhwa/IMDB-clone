const UserRating = require('../db/helper/user_rating');
const ContentRating = require('../db/helper/content_rating');

const ratingController = {
  // create review
  createRating: async (req, res) => {
    try {
      const user = res.locals.user;
      const { rating } = req.body;

      const { contentId } = req.params;

      if (!contentId || rating === null)
        return res.status(400).json({ msg: 'Missing field (rating or  contentId)' });

      const userRatingCheck = await UserRating.findById(contentId, { user_id: user.user_id });

      if (userRatingCheck) {
        return res.status(400).json({ msg: 'Rating already submitted for this.' });
      }

      await UserRating.create(rating, contentId, user.user_id);

      const contentRating = await ContentRating.findByContentId(contentId);

      if (contentRating) {
        const prevNoOfRating = contentRating.no_of_rating;
        const newRating = (contentRating.total_rating + rating) / (prevNoOfRating + 1);
        await ContentRating.update(
          contentRating,
          newRating,
          prevNoOfRating + 1,
          contentRating.total_rating + rating
        );
      } else {
        await ContentRating.create(contentId, rating, 1, rating);
      }

      return res.status(200).json({
        msg: 'Rating done sucessfully',
      });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },
};
module.exports = ratingController;

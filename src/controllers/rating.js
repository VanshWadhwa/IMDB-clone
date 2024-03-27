const { UserRating, ContentRating } = require('../db/models/rating');

const ratingController = {
  // create review
  createRating: async (req, res) => {
    try {
      const user = res.locals.user;
      const { rating, contentId } = req.body;

      if (!contentId || rating === null)
        return res.status(400).json({ msg: 'Missing field (rating or  contentId)' });

      const userRatingCheck = await UserRating.findOne({
        where: {
          contentId: contentId,
          UserId: user.id,
        },
      });

      if (userRatingCheck)
        return res.status(400).json({ msg: 'Rating already submitted for this.' });

      await UserRating.create({ rating, contentId, UserId: user.id });

      const contentRating = await ContentRating.findOne({
        where: {
          contentId: contentId,
        },
      });

      if (contentRating) {
        const prevNoOfRating = contentRating.noOfRating;
        const newRating = (contentRating.totalRating + rating) / (prevNoOfRating + 1);

        await contentRating.update({
          rating: newRating,
          noOfRating: prevNoOfRating + 1,
          totalRating: contentRating.totalRating + rating,
        });
      } else {
        console.log('totalRatings');
        console.log(rating);
        await ContentRating.create({
          contentId: contentId,
          rating: rating,
          noOfRating: 1,
          totalRating: rating,
        });
      }

      return res.status(200).json({
        msg: 'Rating done sucessfully',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },
};
module.exports = ratingController;

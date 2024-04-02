const ContentRating = require('../db/models/content_rating');
const Review = require('../db/models/review');
const getTMDBData = require('../utils/tmdb');

const movieController = {
  detail: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ msg: 'No ID provided' });
      }

      const reviews = await Review.findAll({
        where: {
          contentId: id,
        },
      });
      const ratings = await ContentRating.findOne({
        where: {
          contentId: id,
        },
      });

      await getTMDBData(`movie/${id}?language=en-US`)
        .then(function (response) {
          if (reviews) {
            response.data['reviews'] = reviews;
          }
          if (ratings) {
            response.data['ratings'] = ratings;
          }
          return res.status(200).json({ data: response.data });
        })
        .catch((error) => {
          if (error.response.status == 404) {
            return res.status(500).json({
              msg: 'Invalid ID',
            });
          }

          console.log(error);
          return res.status(500).json({
            msg: 'Invalid details or Try again later',
          });
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: 'Internal Server Error',
      });
    }
  },
  trending: async (req, res) => {
    try {
      await getTMDBData(`trending/all/day?language=en-U`)
        .then(function (response) {
          return res.status(200).json({ data: response.data });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({
            msg: 'Invalid details or Try again later',
          });
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: 'Internal Server Error',
      });
    }
  },
  discover: async (req, res) => {
    try {
      const { year, with_genres, page } = req.query;
      const URL =
        `discover/movie?language=en-U&` +
        new URLSearchParams({ year, with_genres, page }).toString();

      await getTMDBData(URL)
        .then(function (response) {
          return res.status(200).json({ data: response.data });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({
            msg: 'Invalid details or Try again later',
          });
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: 'Internal Server Error',
      });
    }
  },
};

module.exports = movieController;

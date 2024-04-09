const Review = require('./../db/helper/review');
const ContentRating = require('./../db/helper/content_rating');
const getTMDBData = require('../utils/tmdb');

const movieController = {
  detail: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ msg: 'No ID provided' });
      }

      const reviews = await Review.findAllById(id);
      const ratings = await ContentRating.findByContentId(id);

      const response = await getTMDBData(`movie/${id}?language=en-US`);
      if (reviews) {
        response.data['reviews'] = reviews;
      }
      if (ratings) {
        response.data['ratings'] = ratings;
      }
      return res.status(200).json({ data: response.data });
    } catch (error) {
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
        .catch(() => {
          return res.status(500).json({
            msg: 'Invalid details or Try again later',
          });
        });
    } catch (error) {
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
        .catch(() => {
          return res.status(500).json({
            msg: 'Invalid details or Try again later',
          });
        });
    } catch (error) {
      return res.status(500).json({
        msg: 'Internal Server Error',
      });
    }
  },
};

module.exports = movieController;

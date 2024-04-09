const Review = require('./../db/helper/review');
const ContentRating = require('./../db/helper/content_rating');
const { getTrendingMovies, getDiscoverMovies, getMovieById } = require('../utils/tmdb');

const movieController = {
  detail: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ msg: 'No ID provided' });
      }

      const reviews = await Review.findAllById(id);
      const ratings = await ContentRating.findByContentId(id);

      const response = await getMovieById(id);
      if (reviews) {
        response.data['reviews'] = reviews;
      }
      if (ratings) {
        response.data['ratings'] = ratings;
      }
      return res.status(200).json({ data: response.data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: 'Internal Server Error',
      });
    }
  },
  trending: async (req, res) => {
    try {
      const response = await getTrendingMovies();
      return res.status(200).json({ data: response.data });
    } catch (error) {
      return res.status(500).json({
        msg: 'Internal Server Error',
      });
    }
  },
  discover: async (req, res) => {
    try {
      const { year, with_genres, page } = req.query;

      const response = getDiscoverMovies(year, with_genres, page);
      return res.status(200).json({ data: response.data });
    } catch (error) {
      return res.status(500).json({
        msg: 'Internal Server Error',
      });
    }
  },
};

module.exports = movieController;

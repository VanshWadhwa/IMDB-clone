const axios = require('axios');
const Review = require('../db/models/review');
const { ContentRating } = require('../db/models/rating');
const TMDB_URL = require('../config')['TMDB_URL'];
const TMDB_TOKEN = require('../config')['TMDB_TOKEN'];
const movieController = {
  detail: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ msg: 'No ID provided' });

      const options = {
        method: 'GET',
        url: `${TMDB_URL}movie/${id}?language=en-US`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_TOKEN}`,
        },
      };

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
      axios
        .request(options)
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
      return res.status(500).json({
        msg: 'Internal Server Error',
      });
    }
  },
  trending: async (req, res) => {
    try {
      const options = {
        method: 'GET',
        url: `${TMDB_URL}trending/all/day?language=en-U`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_TOKEN}`,
        },
      };

      axios
        .request(options)
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
      return res.status(500).json({
        msg: 'Internal Server Error',
      });
    }
  },
  discover: async (req, res) => {
    try {
      const { year, with_genres, page } = req.query;
      const URL =
        `${TMDB_URL}discover/movie?language=en-U&` +
        new URLSearchParams({ year, with_genres, page }).toString();

      console.log("'https://api.themoviedb.org/3/discover/movie?language=en-US&page=2&year=2020',");
      const options = {
        method: 'GET',
        url: URL,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_TOKEN}`,
        },
      };

      axios
        .request(options)
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

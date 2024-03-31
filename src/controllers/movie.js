const axios = require('axios');
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

      axios
        .request(options)
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

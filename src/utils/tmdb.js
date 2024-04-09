const axios = require('axios');
const TMDB_URL = require('../config')['TMDB_URL'];
const TMDB_TOKEN = require('../config')['TMDB_TOKEN'];

async function getTMDBData(endpoint) {
  const options = {
    method: 'GET',
    url: `${TMDB_URL}${endpoint}`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  };
  return await axios.request(options);
}

async function getMovieById(id) {
  return await getTMDBData(`movie/${id}?language=en-US`);
}

async function getTrendingMovies() {
  return await getTMDBData(`trending/all/day?language=en-U`);
}

async function getDiscoverMovies(year, with_genres, page) {
  const URL =
    `discover/movie?language=en-U&` + new URLSearchParams({ year, with_genres, page }).toString();

  return await getTMDBData(URL);
}

module.exports = { getMovieById, getTrendingMovies, getDiscoverMovies };

const axios = require('axios');
const TMDB_URL = require('../config')['TMDB_URL'];
const TMDB_TOKEN = require('../config')['TMDB_TOKEN'];

function getTMDBData(endpoint) {
  const options = {
    method: 'GET',
    url: `${TMDB_URL}${endpoint}`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  };
  return axios.request(options);
}

module.exports = getTMDBData;

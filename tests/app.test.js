/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');

describe('GET /health', () => {
  it('should return success', async () => {
    const res = await request(app).get(`/health`).expect(200).expect('Content-Type', /json/);

    expect(res.body).toBeDefined();
    expect(res.body).toStrictEqual({
      status: 'SUCCESS',
    });
  });
});

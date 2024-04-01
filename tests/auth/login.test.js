/* eslint-disable no-undef */
const request = require('supertest');

const app = require('../../app');
const User = require('../../src/db/models/user');

describe('/POST Login', () => {
  jest.spyOn(User, 'findOne').mockResolvedValue({
    id: 1,
    username: 'example',
    email: 'example@example.com',
    password: '$2b$10$0kN0qQoLnHgE0m4C5pf5dOUZgj.AGw.0k.jqfn4rryKdjg3CCWesW',
  });
  it('should return successful login', async () => {
    const body = {
      email: 'example@example.com',
      password: '1234',
    };
    await request(app).post(`/auth/login`).send(body).expect(200);
  });
  it('should return incomplete data ', async () => {
    await request(app).post(`/auth/login`).expect(400);
  });
  it('should return password incorrect ', async () => {
    const body = {
      email: 'example@example.com',
      password: 'password',
    };
    await request(app).post(`/auth/login`).send(body).expect(400);
  });
});

describe('/POST Register', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return successful registeration', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(null);
    jest.spyOn(User, 'create').mockResolvedValue({});
    const body = {
      username: 'example',
      email: 'example@example.com',
      password: '1234',
    };
    await request(app).post(`/auth/register`).send(body).expect(200);
  });
  it('should return user already exists', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue({
      id: 1,
      username: 'example',
      email: 'example@example.com',
      password: '$2b$10$0kN0qQoLnHgE0m4C5pf5dOUZgj.AGw.0k.jqfn4rryKdjg3CCWesW',
    });

    const body = {
      username: 'example',
      email: 'example@example.com',
      password: '1234',
    };
    await request(app).post(`/auth/register`).send(body).expect(400);
  });
  it('should return incomplete data ', async () => {
    await request(app).post(`/auth/register`).expect(400);
  });
});

const request = require('supertest');
const app = require('../src/index');

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.name).toBe(userData.name);
      expect(response.body.user.email).toBe(userData.email);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login an existing user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(userData)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user).toHaveProperty('name');
      expect(response.body.user).toHaveProperty('email');
    });
  });
});
const supertest = require('supertest')
const { app } = require('../src/server');
const request = supertest(app)
const sequelize = require('../src/models/index')

beforeAll(async () => {
  await sequelize.sync();
})
afterAll(async () => {
  await sequelize.drop();
})

describe('AUTH Routes', () => {
  let token;
  describe('POST /signup', () => {
    it('creates a new user and sends an object with the user and the token to the client', async () => {
      const response = await request.post('/signup').send({
        username: 'testuser',
        password: 'testpassword',
      })
      console.log('test',response.body.token)
      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty('username');
      expect(response.body).toHaveProperty('token');
      expect(response.body.username).toBe('testuser');
      expect(response.body.token).toBeDefined();
    });
  });
  describe('POST /signin with basic authentication headers', () => {
    beforeAll(async () => {
      const signupResponse = await request.post('/signup').send({
        username: 'testuser',
        password: 'testpassword',
      });
      token = signupResponse.body.token;
    });

    it('logs in a user and sends an object with the user and the token to the client', async () => {
      const response = await request.post('/signin')
        .set('Authorization', `Basic ${Buffer.from('testuser:testpassword')
          .toString('base64')}`)
        .expect(200);

      expect(response.body).toHaveProperty('username');
      expect(response.body).toHaveProperty('token');
      expect(response.body.username).toBe('testuser');
      expect(response.body.token).toBeDefined();
    });
  });

});

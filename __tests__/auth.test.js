const supertest = require('supertest')
const { app } = require('../src/server');
const request = supertest(app)
const sequelize = require('../src/models/index')
let userdata = {
  mockuser: {
    username: 'testuser',
    password: 'testpassword',
    role: 'user'
  }
}
beforeAll(async () => {
  await sequelize.sync();
})
afterAll(async () => {
  await sequelize.drop();
})
let accessToken = null;
describe('AUTH Routes', () => {
  let token;
  describe('POST /signup', () => {
    it('creates a new user and sends an object with the user and the token to the client', async () => {
      const response = await request.post('/signup').send(userdata.mockuser)
      console.log('test', response.body.token)
      expect(response.status).toBe(201);
      expect(response.body.username).toBeDefined();
      // expect(response.body).toHaveProperty('token');
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

    // it('logs in a user and sends an object with the user and the token to the client', async () => {
    //   const response = await request.post('/signin')
    //     .set('Authorization', `Basic ${Buffer.from('testuser:testpassword')
    //       .toString('base64')}`)
    //     .expect(200);

    //   expect(response.body).toHaveProperty('username');
    //   expect(response.body).toHaveProperty('token');
    //   expect(response.body.username).toBe('testuser');
    //   expect(response.body.token).toBeDefined();
    // });
    it('Can signin with bearer auth token', async () => {
      let { username, password } = userdata.mockuser;

      // First, use basic to login to get a token
      const response = await request.post('/signin')
        .auth(username, password);

      accessToken = response.body.token;

      // First, use basic to login to get a token
      const bearerResponse = await request
        .get('/users')
        .set('Authorization', `Bearer ${accessToken}`);

      // Not checking the value of the response, only that we "got in"
      expect(bearerResponse.status).toBe(200);
    });
  });

});

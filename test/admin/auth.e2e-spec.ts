import * as request from 'supertest';
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  APP_URL,
  PREFIX,
} from '../utils/constants';

describe('Auth admin (e2e)', () => {
  it('Login: /auth/admin/email/login (POST)', () => {
    return request(APP_URL + PREFIX)
      .post('/auth/admin/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .expect(200)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
      });
  });

  it('Login via user endpoint: /auth/email/login (POST)', () => {
    return request(APP_URL + PREFIX)
      .post('/auth/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .expect(422);
  });
});

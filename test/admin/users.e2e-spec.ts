import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  APP_URL,
  PREFIX,
} from '../utils/constants';
import * as request from 'supertest';
import { RoleEnum } from '../../src/roles/roles.enum';
import { StatusEnum } from '../../src/statuses/statuses.enum';

describe('Users admin (e2e)', () => {
  const app = APP_URL + PREFIX;
  let newUserFirst;
  const newUserEmailFirst = `user-first.${Date.now()}@example.com`;
  const newUserPasswordFirst = `secret`;
  const newUserByAdminEmailFirst = `user-created-by-admin.${Date.now()}@example.com`;
  const newUserByAdminPasswordFirst = `secret`;
  let apiToken;

  beforeAll(async () => {
    await request(app)
      .post('/auth/admin/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .then(({ body }) => {
        apiToken = body.token;
      });

    await request(app)
      .post('/auth/email/login')
      .send({ email: newUserEmailFirst, password: newUserPasswordFirst })
      .then(({ body }) => {
        newUserFirst = body.user;
      });
  });

  // it('Login via registered user: /auth/email/login (GET)', () => {
  //   return request(app)
  //     .post('/auth/email/login')
  //     .send({ email: newUserEmailFirst, password: newUserChangedPasswordFirst })
  //     .expect(200)
  //     .expect(({ body }) => {
  //       expect(body.token).toBeDefined();
  //     });
  // });

  // it('Fail create new user by admin: /users (POST)', () => {
  //   return request(app)
  //     .post(`/users`)
  //     .auth(apiToken, {
  //       type: 'bearer',
  //     })
  //     .send({ email: 'fail-data' })
  //     .expect(422);
  // });

  it('Success create new user by admin: /users (POST)', () => {
    return request(app)
      .post(`/users`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({
        email: newUserByAdminEmailFirst,
        password: newUserByAdminPasswordFirst,
        firstName: `UserByAdmin${Date.now()}`,
        lastName: 'E2E',
        role: {
          id: RoleEnum.user,
        },
        status: {
          id: StatusEnum.active,
        },
      })
      .expect(201);
  });

  it('Login via created by admin user: /auth/email/login (GET)', () => {
    return request(app)
      .post('/auth/email/login')
      .send({
        email: newUserByAdminEmailFirst,
        password: newUserByAdminPasswordFirst,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
      });
  });
});

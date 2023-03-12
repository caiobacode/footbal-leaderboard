import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UsersModel';
import { admTokenMock } from './mocks'

chai.use(chaiHttp);

const { expect } = chai;

describe('Login test', function () {
  it('endpoint POST "/login" - success', async function () {
    sinon.stub(UserModel, 'findOne').resolves(admTokenMock as UserModel);
    
    const chaiRequest = { email: 'admin@admin.com', password: 'secret_admin' }
    const chaiResponse = await chai.request(app).post('/login').send(chaiRequest);
    
    expect(chaiResponse.status).to.equal(200);
  })
  afterEach(function () {
    sinon.restore();
  });
});
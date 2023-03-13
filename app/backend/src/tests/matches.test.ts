import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchesModel';
import { allMatchesMock } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', function () {
  it('endpoint GET "/matches"', async function () {
    sinon.stub(Matches, 'findAll').resolves(allMatchesMock as Matches[]);
    
    const chaiResponse = await chai.request(app).get('/matches');

    expect(chaiResponse.status).to.equal(200);
    expect(chaiResponse.body).to.be.deep.equal(allMatchesMock);
  });
  afterEach(function () {
    sinon.restore();
  });
});
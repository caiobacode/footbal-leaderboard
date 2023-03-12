import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import { allTeamsMock, oneTeamMock } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', function () {
  it('endpoint GET "/teams"', async function () {
    sinon.stub(TeamsModel, 'findAll').resolves(allTeamsMock as TeamsModel[]);
    
    const chaiResponse = await chai.request(app).get('/teams');

    expect(chaiResponse.status).to.equal(200);
    expect(chaiResponse.body).to.be.deep.equal(allTeamsMock);
  });

  it('endpoint GET "/teams/:id"', async function () {
    sinon.stub(TeamsModel, 'findByPk').resolves(oneTeamMock as TeamsModel);

    const chaiResponse = await chai.request(app).get('/teams/12');

    expect(chaiResponse.status).to.equal(200);
    expect(chaiResponse.body).to.be.deep.equal(oneTeamMock);
  });
  afterEach(function () {
    sinon.restore();
  });
});
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', function () {
  it('endpoint GET "/teams"', async function () {
    const allTeamsMock = [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
    ];
    sinon.stub(TeamsModel, 'findAll').resolves(allTeamsMock as TeamsModel[]);
    
    const chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allTeamsMock);
  });

  it('endpoint GET "/teams/:id"', async function () {
    const oneTeamMock = {
      "id": 12,
      "teamName": "Palmeiras"
    };

    sinon.stub(TeamsModel, 'findByPk').resolves(oneTeamMock as TeamsModel);

    const chaiHttpResponse = await chai.request(app).get('/teams/12');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(oneTeamMock);
  });
  afterEach(function () {
    sinon.restore();
  });
});
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import { 
  allMatchesMock, 
  allTeamsMock, 
  homeResultMock, 
  awayResultsMock, 
  totalResultsMock 
} from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard test', function () {
  it('endpoint GET "/leaderboard/home"', async function () {
    sinon.stub(Matches, 'findAll').resolves(allMatchesMock as Matches[]);
    sinon.stub(Teams, 'findAll').resolves(allTeamsMock as Teams[]);
    
    const chaiResponse = await chai.request(app).get('/leaderboard/home');

    expect(chaiResponse.status).to.equal(200);
    expect(chaiResponse.body).to.be.deep.equal(homeResultMock);
  });

  it('endpoint GET "/leaderboard/away"', async function () {
    sinon.stub(Matches, 'findAll').resolves(allMatchesMock as Matches[]);
    sinon.stub(Teams, 'findAll').resolves(allTeamsMock as Teams[]);
    
    const chaiResponse = await chai.request(app).get('/leaderboard/away');

    expect(chaiResponse.status).to.equal(200);
    expect(chaiResponse.body).to.be.deep.equal(awayResultsMock);
  });

  it('endpoint GET "/leaderboard"', async function () {
    sinon.stub(Matches, 'findAll').resolves(allMatchesMock as Matches[]);
    sinon.stub(Teams, 'findAll').resolves(allTeamsMock as Teams[]);
    
    const chaiResponse = await chai.request(app).get('/leaderboard');

    expect(chaiResponse.status).to.equal(200);
    expect(chaiResponse.body).to.be.deep.equal(totalResultsMock);
  });
  afterEach(function () {
    sinon.restore();
  });
});
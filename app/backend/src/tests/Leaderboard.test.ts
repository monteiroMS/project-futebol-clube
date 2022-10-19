import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import * as chaiHttp from 'chai-http';
import { app } from '../app';
import Match from '../database/models/Match';
import matchesMock from './utils/matchesMock';
import { iMatch, iTeamStats } from '../interfaces';

chai.use(chaiHttp);

const { expect } = chai;

const checkIfHasAllProperties = (reqBody: iTeamStats[]) => {
  reqBody.forEach((team: iTeamStats) => {
    expect(team).to.haveOwnProperty('efficiency').to.be.a('number');
    expect(team).to.haveOwnProperty('name').to.be.a('string');
    expect(team).to.haveOwnProperty('totalPoints').to.be.a('number');
    expect(team).to.haveOwnProperty('totalVictories').to.be.a('number');
    expect(team).to.haveOwnProperty('totalDraws').to.be.a('number');
    expect(team).to.haveOwnProperty('totalLosses').to.be.a('number');
    expect(team).to.haveOwnProperty('goalsFavor').to.be.a('number');
    expect(team).to.haveOwnProperty('goalsOwn').to.be.a('number');
    expect(team).to.haveOwnProperty('goalsBalance').to.be.a('number');
  });
};

describe('Testa o endpoint GET /leaderboard/home', () => {
  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchesMock as iMatch[]);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('O endpoint retorna o leaderboard com as chaves solicitadas e um status 200', async () => {
    const { status, body } = await chai
      .request(app)
      .get('/leaderboard/home');

    expect(status).to.be.equal(200);
    checkIfHasAllProperties(body);
  });
});

describe('Testa o endpoint GET /leaderboard/away', () => {
  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchesMock as iMatch[]);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('O endpoint retorna o leaderboard com as chaves solicitadas e um status 200', async () => {
    const { status, body } = await chai
      .request(app)
      .get('/leaderboard/away');

    expect(status).to.be.equal(200);
    checkIfHasAllProperties(body);
  });
});

describe('Testa o endpoint GET /leaderboard', () => {
  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchesMock as iMatch[]);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('O endpoint retorna o leaderboard com as chaves solicitadas e um status 200', async () => {
    const { status, body } = await chai
      .request(app)
      .get('/leaderboard');

    expect(status).to.be.equal(200);
    checkIfHasAllProperties(body);
  });
});
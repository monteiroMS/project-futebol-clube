import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import * as chaiHttp from 'chai-http';
import { app } from '../app';
import Match from '../database/models/Match';
import matchesMock from './utils/matchesMock';
import iMatch from '../interfaces/iMatch';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint GET /matches', () => {
  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchesMock as iMatch[]);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('O endpoint deve retornar todas as partidas e um status 200', async () => {
    const { status, body } = await chai
      .request(app)
      .get('/matches');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchesMock);
  });
});

describe('Testa o endpoint GET /matches com filtro para partidas em progresso ativo', () => {
  const inProgressMatches = matchesMock.filter(({ inProgress }) => inProgress);
  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(inProgressMatches as iMatch[]);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('O endpoint deve retornar todas as partidas em progresso e um status 200', async () => {
    const { status, body } = await chai
      .request(app)
      .get('/matches?inProgress=true');

    expect(status).to.be.equal(200);
    body.forEach((match: iMatch) => {
      expect(match.inProgress).to.be.equal(true);
    });
  });
});

describe('Testa o endpoint GET /matches com filtro para partidas finalizadas ativo', () => {
  const finishedMatches = matchesMock.filter(({ inProgress }) => !inProgress);
  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(finishedMatches as iMatch[]);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('O endpoint deve retornar todas as partidas encerradas e um status 200', async () => {
    const { status, body } = await chai
      .request(app)
      .get('/matches?inProgress=false');

    expect(status).to.be.equal(200);
    body.forEach((match: iMatch) => {
      expect(match.inProgress).to.be.equal(false);
    });
  });
});

import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import * as chaiHttp from 'chai-http';
import { app } from '../app';
import Team from '../database/models/Team';
import teamsMock from './utils/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint GET /teams', () => {
  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(teamsMock as Team[]);

    sinon
      .stub(Team, "findByPk")
      .resolves(teamsMock[0] as Team);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it('O endpoint deve retornar todas as equipes e um status 200', async () => {
    const { status, body } = await chai
    .request(app)
    .get('/teams');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teamsMock);
  });

  it('O endpoint /teams/:id deve retornar a equipe com o id da rota e um status 200', async () => {
    const { status, body } = await chai
    .request(app)
    .get('/teams/1');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teamsMock[0]);
  });
});

describe('O endpoint GET /teams/:id', () => {
  before(async () => {
    sinon
      .stub(Team, "findByPk")
      .resolves(null);
  });

  after(()=>{
    (Team.findByPk as sinon.SinonStub).restore();
  });

  it('deve retornar a mensage "Team not found" caso seja passado um id inválido', async () => {
    const { status, body } = await chai
    .request(app)
    .get('/teams/9999999');

    expect(status).to.be.equal(404);
    expect(body).to.be.deep.equal({ message: 'Team not found' });
  });
});

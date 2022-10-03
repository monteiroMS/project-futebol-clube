import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import * as chaiHttp from 'chai-http';
import { app } from '../app';
import User from '../database/models/User';
import userDatabaseMock from './utils/userDatabaseMock';
import { user } from './utils/userLoginMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint /login', () => {
  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userDatabaseMock.user as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('É possível fazer login com as credenciais corretas, retornando um status 200', async () => {
    const { status } = await chai
       .request(app)
       .post('/login')
       .send(user.validUser);

    expect(status).to.be.equal(200);
  });

  it('Ao fazer login, a api retorna um token', async () => {
    const { body } = await chai
      .request(app)
      .post('/login')
      .send(user.validUser);

    expect(body)
      .to.have.property('token')
      .to.be.a('string');
  });
});

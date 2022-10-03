import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import * as chaiHttp from 'chai-http';
import { app } from '../app';
import User from '../database/models/User';
import userDatabaseMock from './utils/userDatabaseMock';
import { user, noEmail, noPassword, admin } from './utils/userLoginMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint POST /login', () => {
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

  it('Ao fazer login, a API retorna um token', async () => {
    const { body } = await chai
      .request(app)
      .post('/login')
      .send(user.validUser);

    expect(body)
      .to.have.property('token')
      .to.be.a('string');
  });

  it('Ao logar sem o campo email, a API retorna a mensagem "All fields must be filled"', async () => {
    const { body } = await chai
      .request(app)
      .post('/login')
      .send(noEmail);

    expect(body)
      .to.have.property('message')
      .to.be.a('string')
      .to.be.equal('All fields must be filled');
  });

  it('Ao logar sem o campo email a API retorna um status 400', async () => {
    const { status } = await chai
      .request(app)
      .post('/login')
      .send(noEmail);

    expect(status).to.be.equal(400);
  });

  it('Ao logar sem o campo password, a API retorna a mensagem "All fields must be filled"', async () => {
    const { body } = await chai
      .request(app)
      .post('/login')
      .send(noPassword);

    expect(body)
      .to.have.property('message')
      .to.be.a('string')
      .to.be.equal('All fields must be filled');
  });

  it('Ao logar sem o campo password a API retorna um status 400', async () => {
    const { status } = await chai
      .request(app)
      .post('/login')
      .send(noPassword);

    expect(status).to.be.equal(400);
  });

  it('Ao logar com senha iválida, a API retorna a mensagem "Incorrect email or password"', async () => {
    const { body } = await chai
      .request(app)
      .post('/login')
      .send(user.invalidPassword);

    expect(body)
      .to.have.property('message')
      .to.be.a('string')
      .to.be.equal('Incorrect email or password');
  });

  it('Ao logar com senha iválida, a API retorna um status 401', async () => {
    const { status } = await chai
      .request(app)
      .post('/login')
      .send(user.invalidPassword);

    expect(status).to.be.equal(401);
  });
});

describe('Testa o endpoint POST /login -> ao logar com email inválido', () => {
  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(null);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('a API retorna a mensagem "Incorrect email or password"', async () => {
    const { body } = await chai
      .request(app)
      .post('/login')
      .send(user.invalidEmail);

    expect(body)
      .to.have.property('message')
      .to.be.a('string')
      .to.be.equal('Incorrect email or password');
  });

  it('a API retorna um status 401', async () => {
    const { status } = await chai
      .request(app)
      .post('/login')
      .send(user.invalidEmail);

    expect(status).to.be.equal(401);
  });
});

describe('Testa o endpoint GET /login/validate -> usuário padrão', () => {
  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userDatabaseMock.user as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Retorna status 200 caso o token no header da requisição seja válido', async () => {
    const { body: { token } } = await chai
      .request(app)
      .post('/login')
      .send(user.validUser);

    const { status } = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', token);

    expect(status).to.be.equal(200);
  });

  it('Retorna "role" de usuário caso o token no header da requisição seja válido', async () => {
    const { body: { token } } = await chai
      .request(app)
      .post('/login')
      .send(user.validUser);

    const { body } = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', token);

    expect(body).to.have.property('role').to.be.equal(userDatabaseMock.user.role);
  });

  it('Retorna status 401 e mensagem "Token not found" se a requisição não possuir token', async () => {
    const { body, status } = await chai
      .request(app)
      .get('/login/validate');

    expect(body).to.have.property('message').to.be.equal('Token not found');
    expect(status).to.be.equal(401);
  });

  it('Retorna mensagem "Expired or invalid token", com status 401 caso o token no header da requisição seja inválido', async () => {
    const { body } = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', 'invalid_token_mock');

    expect(body).to.have.property('message').to.be.equal('Expired or invalid token');
  });
});

describe('Testa o endpoint GET /login/validate -> usuário admin', () => {
  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userDatabaseMock.admin as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Retorna status 200 caso o token no header da requisição seja válido', async () => {
    const { body: { token } } = await chai
      .request(app)
      .post('/login')
      .send(admin.validAdmin);

    const { status } = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', token);

    expect(status).to.be.equal(200);
  });

  it('Retorna "role" de admin caso o token no header da requisição seja válido', async () => {
    const { body: { token } } = await chai
      .request(app)
      .post('/login')
      .send(admin.validAdmin);

    const { body } = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', token);

    expect(body).to.have.property('role').to.be.equal(userDatabaseMock.admin.role);
  });

  it('Retorna status 401 e mensagem "Token not found" se a requisição não possuir token', async () => {
    const { body, status } = await chai
      .request(app)
      .get('/login/validate');

    expect(body).to.have.property('message').to.be.equal('Token not found');
    expect(status).to.be.equal(401);
  });

  it('Retorna mensagem "Expired or invalid token", com status 401 caso o token no header da requisição seja inválido', async () => {
    const { body } = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', 'invalid_token_mock');

    expect(body).to.have.property('message').to.be.equal('Expired or invalid token');
  });
});
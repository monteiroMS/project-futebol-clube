export const admin = {
  validAdmin: {
    email: 'admin@admin.com',
    password: 'secret_admin',
  },
  invalidAdmin: {
    email: 'admin@xablau.com',
    password: 'senha_invalida',
  },
};

export const user = {
  validUser: {
    email: 'user@user.com',
    password: 'secret_user',
  },
  invalidUser: {
    email: 'user@xablau.com',
    password: 'senha_invalida',
  },
  invalidEmail: {
    email: 'user@xablau.com',
    password: 'secret_user',
  },
  invalidPassword: {
    email: 'user@user.com',
    password: 'senha_invalida',
  },
};

export const noEmail = {
  password: 'senha_invalida',
};

export const noPassword = {
  email: 'user@xablau.com',
};

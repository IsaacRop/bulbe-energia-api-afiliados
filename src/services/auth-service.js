const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/users-model');

async function register({ nome, email, senha }) {
  if (!nome || !email || !senha) {
    const err = new Error('Campos nome, email e senha são obrigatórios.');
    err.status = 422;
    throw err;
  }

  if (usersModel.findByEmail(email)) {
    const err = new Error('Email já cadastrado.');
    err.status = 422;
    throw err;
  }

  const hash = await bcrypt.hash(senha, 10);
  const user = usersModel.create({ nome, email, senha: hash });

  const { senha: _, ...userSemSenha } = user;
  return userSemSenha;
}

async function login({ email, senha }) {
  if (!email || !senha) {
    const err = new Error('Credenciais inválidas.');
    err.status = 401;
    throw err;
  }

  const user = usersModel.findByEmail(email);
  if (!user) {
    const err = new Error('Credenciais inválidas.');
    err.status = 401;
    throw err;
  }

  const valid = await bcrypt.compare(senha, user.senha);
  if (!valid) {
    const err = new Error('Credenciais inválidas.');
    err.status = 401;
    throw err;
  }

  const token = jwt.sign(
    { sub: user.id, nome: user.nome, papel: user.papel },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  const { senha: _, ...userSemSenha } = user;
  return { token, user: userSemSenha };
}

module.exports = { register, login };

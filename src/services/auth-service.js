const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/users-model');

async function register({ name, email, password }) {
  if (!name || !email || !password) {
    const err = new Error('Campos name, email e password são obrigatórios.');
    err.status = 422;
    throw err;
  }

  if (usersModel.findByEmail(email)) {
    const err = new Error('Email já cadastrado.');
    err.status = 422;
    throw err;
  }

  const password_hash = await bcrypt.hash(password, 10);
  const user = usersModel.create({ name, email, password_hash });

  const { password_hash: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

async function login({ email, password }) {
  if (!email || !password) {
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

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    const err = new Error('Credenciais inválidas.');
    err.status = 401;
    throw err;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  const { password_hash: _, ...userWithoutPassword } = user;
  return { token, user: userWithoutPassword };
}

module.exports = { register, login };

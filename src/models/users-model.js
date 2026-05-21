const db = require('../db/conexao');

function findByEmail(email) {
  return db.prepare(
    'SELECT id, nome AS name, email, senha AS password_hash, papel FROM usuarios WHERE email = ?'
  ).get(email);
}

function findById(id) {
  return db.prepare(
    'SELECT id, nome AS name, email, papel FROM usuarios WHERE id = ?'
  ).get(id);
}

function create({ name, email, password_hash }) {
  const result = db.prepare(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)'
  ).run(name, email, password_hash);

  return findById(result.lastInsertRowid);
}

module.exports = { findByEmail, findById, create };

const db = require('../db/conexão');

function findByEmail(email) {
  return db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
}

function findById(id) {
  return db.prepare('SELECT * FROM usuarios WHERE id = ?').get(id);
}

function create({ nome, email, senha, papel = 'cliente' }) {
  const result = db
    .prepare('INSERT INTO usuarios (nome, email, senha, papel) VALUES (?, ?, ?, ?)')
    .run(nome, email, senha, papel);
  return db.prepare('SELECT * FROM usuarios WHERE id = ?').get(result.lastInsertRowid);
}

module.exports = { findByEmail, findById, create };

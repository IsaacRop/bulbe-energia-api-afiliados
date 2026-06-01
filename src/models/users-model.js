const db = require('../db/conexao');

function findByEmail(email) {
  return db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
}

function findById(id) {
  return db.prepare('SELECT * FROM usuarios WHERE id = ?').get(id);
}

// Lista todos os usuários sem expor a senha
function findAll() {
  return db.prepare('SELECT id, nome, email, papel FROM usuarios ORDER BY id').all();
}

function create({ nome, email, senha, papel = 'cliente' }) {
  const result = db.prepare(
    'INSERT INTO usuarios (nome, email, senha, papel) VALUES (?, ?, ?, ?)'
  ).run(nome, email, senha, papel);

  return db.prepare('SELECT * FROM usuarios WHERE id = ?').get(result.lastInsertRowid);
}

module.exports = { findByEmail, findById, findAll, create };

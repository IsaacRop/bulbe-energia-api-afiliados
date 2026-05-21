const db = require('../db/conexao');

function findAll() {
  return db.prepare('SELECT * FROM afiliados').all();
}

function findById(id) {
  return db.prepare('SELECT * FROM afiliados WHERE id = ?').get(Number(id));
}

function findBySlug(slug) {
  return db.prepare('SELECT * FROM afiliados WHERE slug = ?').get(slug);
}

function create({ nome, slug, logo, site }) {
  const result = db.prepare(
    'INSERT INTO afiliados (nome, slug, logo, site) VALUES (?, ?, ?, ?)'
  ).run(nome, slug, logo, site);

  return db.prepare('SELECT * FROM afiliados WHERE id = ?').get(result.lastInsertRowid);
}

module.exports = { findAll, findById, findBySlug, create };

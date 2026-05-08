const produtos = require('../data/produtos.json');

function findAll() {
  return produtos;
}

function findById(id) {
  return produtos.find((p) => p.id === Number(id));
}

module.exports = { findAll, findById };

const afiliados = require('../data/afiliados.json');

function findAll() {
  return afiliados;
}

function findById(id) {
  return afiliados.find((a) => a.id === Number(id));
}

module.exports = { findAll, findById };

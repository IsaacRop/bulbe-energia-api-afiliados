const produtosModel = require('../models/produtos-model');

function listarTodos() {
  return produtosModel.findAll();
}

function buscarPorId(id) {
  const produto = produtosModel.findById(id);
  if (!produto) {
    const err = new Error('Produto não encontrado');
    err.status = 404;
    throw err;
  }
  return produto;
}

module.exports = { listarTodos, buscarPorId };

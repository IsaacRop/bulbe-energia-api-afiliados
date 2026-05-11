const produtosModel = require('../models/produtos-model');

function listar(search) {
  if (search) {
    return produtosModel.findByTerm(search);
  }
  return produtosModel.findAll();
}
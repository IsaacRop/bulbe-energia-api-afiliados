const produtosService = require('../services/produtos-service');

function listar(req, res, next) {
  try {
    const produtos = produtosService.listarTodos();
    return res.status(200).json(produtos);
  } catch (err) {
    return next(err);
  }
}

function buscarPorId(req, res, next) {
  try {
    const produto = produtosService.buscarPorId(req.params.id);
    return res.status(200).json(produto);
  } catch (err) {
    return next(err);
  }
}

module.exports = { listar, buscarPorId };

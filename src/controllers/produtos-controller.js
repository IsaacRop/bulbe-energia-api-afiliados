const produtosService = require('../services/produtos-service');

function listar(req, res, next) {
  try {
    const { search } = req.query;
    const produtos = produtosService.listar(search);
    return res.status(200).json(produtos);
  } catch (err) {
    return next(err);
  }
}


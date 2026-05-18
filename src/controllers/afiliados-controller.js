const afiliadoService = require('../services/afiliados-service');

function listar(req, res, next) {
  try {
    const afiliados = afiliadoService.listarTodos();
    return res.status(200).json(afiliados);
  } catch (err) {
    return next(err);
  }
}

function cadastrar(req, res, next) {
  try {
    const novoAfiliado = afiliadoService.cadastrar(req.body);
    return res.status(201).json(novoAfiliado);
  } catch (err) {
    if(err.status === 422) {
      return res.status(422).json({erro: err.message});
    }
    return next(err);
  }
}

function listarProdutos(req, res, next) {
  try {
    const produtos = afiliadoService.listarProdutosPorAfiliado(req.params.id);
    return res.status(200).json(produtos);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json({ erro: err.message });
    }
    return next(err);
  }
}

module.exports = { listar, cadastrar, listarProdutos };

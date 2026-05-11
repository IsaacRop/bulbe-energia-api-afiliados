const ProdutosService = require('../services/produtos-service');

const ProdutosController = {
  async cadastrar(req, res, next) {
    try {
      const novoProduto = await ProdutosService.cadastrar(req.body);
      return res.status(201).json({ data: novoProduto });
    } catch (err) {
      next(err);
    }
  },

  async listar(req, res, next) {
    try {
      const produtos = await ProdutosService.listarTodos();
      return res.status(200).json({ data: produtos });
    } catch (err) {
      next(err);
    }
  },

  async buscarPorId(req, res, next) {
    try {
      const produto = await ProdutosService.buscarPorId(req.params.id);
      return res.status(200).json({ data: produto });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ProdutosController;

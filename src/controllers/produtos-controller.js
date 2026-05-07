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
};

module.exports = ProdutosController;


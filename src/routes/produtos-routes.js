const ProdutosService = require('../services/produtos-service');

const ProdutosController = {
  async atualizar(req, res, next) {
    try {
      const produto = await ProdutosService.atualizar(req.params.id, req.body);
      return res.status(200).json({ data: produto });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = ProdutosController;
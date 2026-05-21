const CategoriasService = require('../services/categorias-service');

const CategoriasController = {
  async listar(req, res, next) {
    try {
      const categorias = await CategoriasService.listarCategorias();
      return res.status(200).json({ data: categorias });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = CategoriasController;

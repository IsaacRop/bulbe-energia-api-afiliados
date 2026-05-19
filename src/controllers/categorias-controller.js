const CategoriasService = require('../services/categorias-service');

const CategoriasController = {
  async listar(req, res, next) {
    try {
      const categoriaQuery = req.query.categoria;

      if (categoriaQuery) {
        const produtosFiltrados = await CategoriasService.listarProdutosPorCategoria(categoriaQuery);
        return res.status(200).json({ data: produtosFiltrados });
      }

      const categoriasDoMenu = await CategoriasService.listarCategorias();
      return res.status(200).json({ data: categoriasDoMenu });

    } catch (err) {
      next(err);
    }
  }
};

module.exports = CategoriasController;
const { Router } = require('express');
const CategoriasService = require('../services/categorias-service');

const router = Router();

router.get('/', async (req, res, next) => {
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
});

module.exports = router;
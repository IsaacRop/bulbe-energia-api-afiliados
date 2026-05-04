const FavoritosService = require('../services/favoritos-service');

const FavoritosController = {
  async listar(req, res, next) {
    try {
      const favoritos = await FavoritosService.listar(req.usuarioId);
      return res.status(200).json({ data: favoritos });
    } catch (err) {
      next(err);
    }
  },

  async adicionar(req, res, next) {
    try {
      const { produtoId } = req.body;
      const favorito = await FavoritosService.adicionar(req.usuarioId, produtoId);
      return res.status(201).json({ data: favorito });
    } catch (err) {
      next(err);
    }
  },

  async remover(req, res, next) {
    try {
      const removido = await FavoritosService.remover(req.params.id, req.usuarioId);
      return res.status(200).json({ data: removido });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = FavoritosController;
const FavoritosService = require('../services/favoritos-service');

const FavoritosController = {
  async listar(req, res, next) {
    try {
      const favoritos = await FavoritosService.listar(req.user.id);
      return res.status(200).json({ data: favoritos });
    } catch (err) {
      next(err);
    }
  },

  async adicionar(req, res, next) {
    try {
      const { produtoId } = req.body;
      const favorito = await FavoritosService.adicionar(req.user.id, produtoId);
      return res.status(201).json({ data: favorito });
    } catch (err) {
      next(err);
    }
  },

  async remover(req, res, next) {
    try {
      const { id } = req.params;
      const removido = await FavoritosService.remover(id, req.user.id);
      return res.status(200).json({ message: 'Favorito removido com sucesso', data: removido });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = FavoritosController;
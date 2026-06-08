const ComentariosService = require('../services/comentarios-service');

const ComentariosController = {
  async listar(req, res, next) {
    try {
      const { produtoId } = req.query;
      const comentarios = ComentariosService.listarPorProduto(produtoId);
      return res.status(200).json({ data: comentarios });
    } catch (err) {
      next(err);
    }
  },

  async cadastrar(req, res, next) {
    try {
      const novoComentario = await ComentariosService.cadastrar(req.user.sub, req.body);
      return res.status(201).json({ data: novoComentario });
    } catch (err) {
      next(err);
    }
  },

  async atualizar(req, res, next) {
    try {
      const comentario = await ComentariosService.atualizar(req.params.id, req.user.sub, req.body);
      return res.status(200).json({ data: comentario });
    } catch (err) {
      next(err);
    }
  },

  async remover(req, res, next) {
    try {
      await ComentariosService.remover(req.params.id, req.user);
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ComentariosController;

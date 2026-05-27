const FavoritosModel = require('../models/favoritos-model');

const FavoritosService = {
  async listar(usuarioId) {
    return FavoritosModel.findByUsuario(usuarioId);
  },

  async adicionar(usuarioId, produtoId) {
    // Validação: campo obrigatório
    if (!produtoId) {
      const err = new Error('O campo produtoId é obrigatório.');
      err.status = 422;
      throw err;
    }

    // Validação: deve ser inteiro positivo
    const id = Number(produtoId);
    if (!Number.isInteger(id) || id <= 0) {
      const err = new Error('produtoId deve ser um número inteiro válido.');
      err.status = 422;
      throw err;
    }

    // Validação: duplicado
    const duplicado = FavoritosModel.findDuplicado(usuarioId, id);
    if (duplicado) {
      const err = new Error('Este produto já está nos seus favoritos.');
      err.status = 422;
      throw err;
    }

    return FavoritosModel.create({ usuarioId, produtoId: id });
  },

  async remover(id, usuarioId) {
    const removido = FavoritosModel.deleteById(id, usuarioId);
    if (!removido) {
      const err = new Error('Favorito não encontrado.');
      err.status = 404;
      throw err;
    }
    return removido;
  },
};

module.exports = FavoritosService;
// Dados em memória — será substituído na Sprint 3
const favoritos = [];

const FavoritosModel = {
  findByUsuario(usuarioId) {
    return favoritos.filter((f) => f.usuarioId === usuarioId);
  },

  findDuplicado(usuarioId, produtoId) {
    return favoritos.find(
      (f) => f.usuarioId === usuarioId && f.produtoId === produtoId
    );
  },

  create({ usuarioId, produtoId }) {
    const novo = {
      id: String(Date.now()),
      usuarioId,
      produtoId,
      criadoEm: new Date().toISOString(),
    };
    favoritos.push(novo);
    return novo;
  },

  deleteById(id, usuarioId) {
    const index = favoritos.findIndex(
      (f) => f.id === id && f.usuarioId === usuarioId
    );
    if (index === -1) return null;
    const [removido] = favoritos.splice(index, 1);
    return removido;
  },
};

module.exports = FavoritosModel;


const db = require('../db/conexão');

const FavoritosModel = {
  findByUsuario(usuarioId) {
    return db.prepare('SELECT * FROM favoritos WHERE usuario_id = ?').all(usuarioId);
  },

  findDuplicado(usuarioId, produtoId) {
    return db.prepare('SELECT * FROM favoritos WHERE usuario_id = ? AND produto_id = ?').get(usuarioId, produtoId);
  },

  create({ usuarioId, produtoId }) {
    const result = db
      .prepare('INSERT INTO favoritos (usuario_id, produto_id) VALUES (?, ?)')
      .run(usuarioId, produtoId);
    return db.prepare('SELECT * FROM favoritos WHERE id = ?').get(result.lastInsertRowid);
  },

  deleteById(id, usuarioId) {
    const favorito = db
      .prepare('SELECT * FROM favoritos WHERE id = ? AND usuario_id = ?')
      .get(id, usuarioId);
    if (!favorito) return null;
    db.prepare('DELETE FROM favoritos WHERE id = ? AND usuario_id = ?').run(id, usuarioId);
    return favorito;
  },
};

module.exports = FavoritosModel;

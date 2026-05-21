const db = require('../db/conexao');

const SELECT_FAVORITO = `
  SELECT f.id, f.usuario_id, f.produto_id, p.nome AS produto_nome, p.preco, p.imagem
  FROM favoritos f
  JOIN produtos p ON f.produto_id = p.id
`;

function findByUsuario(usuarioId) {
  return db.prepare(`${SELECT_FAVORITO} WHERE f.usuario_id = ?`).all(Number(usuarioId));
}

function findDuplicado(usuarioId, produtoId) {
  return db.prepare(
    'SELECT * FROM favoritos WHERE usuario_id = ? AND produto_id = ?'
  ).get(Number(usuarioId), Number(produtoId));
}

function create({ usuarioId, produtoId }) {
  const result = db.prepare(
    'INSERT INTO favoritos (usuario_id, produto_id) VALUES (?, ?)'
  ).run(Number(usuarioId), Number(produtoId));

  return db.prepare(`${SELECT_FAVORITO} WHERE f.id = ?`).get(result.lastInsertRowid);
}

function deleteById(id, usuarioId) {
  const favorito = db.prepare('SELECT * FROM favoritos WHERE id = ? AND usuario_id = ?')
    .get(Number(id), Number(usuarioId));

  if (!favorito) return null;

  db.prepare('DELETE FROM favoritos WHERE id = ?').run(Number(id));
  return favorito;
}

module.exports = { findByUsuario, findDuplicado, create, deleteById };

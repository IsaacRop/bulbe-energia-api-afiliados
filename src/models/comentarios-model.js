const db = require('../db/conexao');

const SELECT_COMENTARIO = `
  SELECT c.id, c.produto_id AS produtoId, c.usuario_id AS usuarioId, u.nome AS usuarioNome,
         c.conteudo, c.nota, c.criado_em AS criadoEm
  FROM comentarios c
  JOIN usuarios u ON c.usuario_id = u.id
`;

const ComentariosModel = {
  findByProduto(produtoId) {
    return db.prepare(`${SELECT_COMENTARIO} WHERE c.produto_id = ? ORDER BY c.id DESC`).all(Number(produtoId));
  },

  findById(id) {
    return db.prepare(`${SELECT_COMENTARIO} WHERE c.id = ?`).get(Number(id));
  },

  create({ produtoId, usuarioId, conteudo, nota }) {
    const result = db.prepare(`
      INSERT INTO comentarios (produto_id, usuario_id, conteudo, nota)
      VALUES (?, ?, ?, ?)
    `).run(Number(produtoId), Number(usuarioId), conteudo, nota ?? null);

    return this.findById(result.lastInsertRowid);
  },

  updateById(id, dados) {
    const sets = [];
    const values = [];

    if (dados.conteudo !== undefined) { sets.push('conteudo = ?'); values.push(dados.conteudo); }
    if (dados.nota !== undefined) { sets.push('nota = ?'); values.push(dados.nota); }

    if (sets.length === 0) return null;

    values.push(Number(id));
    db.prepare(`UPDATE comentarios SET ${sets.join(', ')} WHERE id = ?`).run(...values);

    return this.findById(id);
  },

  deleteById(id) {
    const comentario = this.findById(id);
    if (!comentario) return null;
    db.prepare('DELETE FROM comentarios WHERE id = ?').run(Number(id));
    return comentario;
  },
};

module.exports = ComentariosModel;

const db = require('../db/conexao');

const CategoriasModel = {
  findByCategoria(categoria) {
    return db.prepare(`
      SELECT p.id, p.nome, p.descricao, p.preco, p.imagem, p.link_afiliado AS linkAfiliado,
             a.nome AS loja, a.logo AS lojalogo, c.nome AS categoria
      FROM produtos p
      LEFT JOIN afiliados a ON p.afiliado_id = a.id
      LEFT JOIN categorias c ON p.categoria_id = c.id
      WHERE c.nome LIKE ?
      ORDER BY p.id
    `).all(`%${categoria}%`);
  },

  findCategoriasUnicas() {
    return db.prepare('SELECT nome FROM categorias ORDER BY nome').all().map((r) => r.nome);
  },
};

module.exports = CategoriasModel;

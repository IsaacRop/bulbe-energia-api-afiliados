const db = require('../db/conexao');

const ProdutosModel = {
  create(dados) {
    const stmt = db.prepare(`
      INSERT INTO produtos (nome, descricao, preco, imagem, afiliado_id, categoria_id)
      VALUES (@nome, @descricao, @preco, @imagem, @afiliado_id, @categoria_id)
    `);

    const result = stmt.run(dados);

    return db.prepare('SELECT * FROM produtos WHERE id = ?').get(result.lastInsertRowid);
  },

  findAll() {
    return db.prepare('SELECT * FROM produtos').all();
  },

  findByFiltros({ search, categoria }) {
    if (search) {
      return db.prepare(`
        SELECT * FROM produtos
        WHERE nome LIKE ? OR descricao LIKE ?
      `).all(`%${search}%`, `%${search}%`);
    }

    if (categoria) {
      return db.prepare(`
        SELECT p.* FROM produtos p
        JOIN categorias c ON c.id = p.categoria_id
        WHERE c.nome = ?
      `).all(categoria);
    }

    return this.findAll();
  },

  findById(id) {
    return db.prepare('SELECT * FROM produtos WHERE id = ?').get(Number(id));
  },

  updateById(id, dados) {
    const stmt = db.prepare(`
      UPDATE produtos
      SET nome = @nome,
          descricao = @descricao,
          preco = @preco,
          imagem = @imagem,
          afiliado_id = @afiliado_id,
          categoria_id = @categoria_id
      WHERE id = @id
    `);

    stmt.run({ ...dados, id: Number(id) });

    return db.prepare('SELECT * FROM produtos WHERE id = ?').get(Number(id));
  },

  deleteById(id) {
    const produto = db.prepare('SELECT * FROM produtos WHERE id = ?').get(Number(id));
    if (!produto) return null;

    db.prepare('DELETE FROM produtos WHERE id = ?').run(Number(id));
    return produto;
  },

  findByAfiliadoNome(nomeAfiliado) {
    return db.prepare(`
      SELECT p.* FROM produtos p
      JOIN afiliados a ON a.id = p.afiliado_id
      WHERE a.nome = ?
    `).all(nomeAfiliado);
  },
};

module.exports = ProdutosModel;
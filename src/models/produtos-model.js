const db = require('../db/conexao');

const SELECT_PRODUTO = `
  SELECT p.id, p.nome, p.descricao, p.preco, p.imagem, p.link_afiliado AS linkAfiliado,
         p.tags_home,
         a.nome AS loja, a.logo AS lojalogo, c.nome AS categoria
  FROM produtos p
  LEFT JOIN afiliados a ON p.afiliado_id = a.id
  LEFT JOIN categorias c ON p.categoria_id = c.id
`;

const ProdutosModel = {
  findAll() {
    return db.prepare(`${SELECT_PRODUTO} ORDER BY p.id`).all();
  },

  findById(id) {
    return db.prepare(`${SELECT_PRODUTO} WHERE p.id = ?`).get(Number(id));
  },

  findBySearch(termo) {
    const like = `%${termo}%`;
    return db.prepare(`${SELECT_PRODUTO} WHERE p.nome LIKE ? OR p.descricao LIKE ? ORDER BY p.id`)
      .all(like, like);
  },

  findByCategoria(categoria) {
    return db.prepare(`${SELECT_PRODUTO} WHERE c.nome LIKE ? ORDER BY p.id`)
      .all(`%${categoria}%`);
  },

  findByAfiliadoNome(nomeAfiliado) {
    return db.prepare(`${SELECT_PRODUTO} WHERE a.nome = ? ORDER BY p.id`)
      .all(nomeAfiliado);
  },

  create(dados) {
    const { nome, descricao, preco, imagem, linkAfiliado, loja, categoria } = dados;

    const afiliado = db.prepare('SELECT id FROM afiliados WHERE nome = ?').get(loja);
    const cat = db.prepare('SELECT id FROM categorias WHERE nome = ?').get(categoria);

    const result = db.prepare(`
      INSERT INTO produtos (nome, descricao, preco, imagem, link_afiliado, afiliado_id, categoria_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      nome,
      descricao || null,
      preco,
      imagem || null,
      linkAfiliado || null,
      afiliado ? afiliado.id : null,
      cat ? cat.id : null
    );

    return this.findById(result.lastInsertRowid);
  },

  updateById(id, dados) {
    const camposSimples = { nome: 'nome', descricao: 'descricao', preco: 'preco', imagem: 'imagem', linkAfiliado: 'link_afiliado' };
    const sets = [];
    const values = [];

    for (const [campo, coluna] of Object.entries(camposSimples)) {
      if (dados[campo] !== undefined) {
        sets.push(`${coluna} = ?`);
        values.push(dados[campo]);
      }
    }

    if (dados.loja !== undefined) {
      const afiliado = db.prepare('SELECT id FROM afiliados WHERE nome = ?').get(dados.loja);
      if (afiliado) { sets.push('afiliado_id = ?'); values.push(afiliado.id); }
    }

    if (dados.categoria !== undefined) {
      const cat = db.prepare('SELECT id FROM categorias WHERE nome = ?').get(dados.categoria);
      if (cat) { sets.push('categoria_id = ?'); values.push(cat.id); }
    }

    if (sets.length === 0) return null;

    values.push(Number(id));
    db.prepare(`UPDATE produtos SET ${sets.join(', ')} WHERE id = ?`).run(...values);

    return this.findById(id);
  },

  deleteById(id) {
    const produto = this.findById(id);
    if (!produto) return null;
    db.prepare('DELETE FROM produtos WHERE id = ?').run(Number(id));
    return produto;
  },
};

module.exports = ProdutosModel;

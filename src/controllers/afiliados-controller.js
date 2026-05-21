// src/controllers/afiliados-controller.js
 
const db = require('../db/conexão'); // instância better-sqlite3 exportada em conexão.js
 
// ─── GET /api/v1/afiliados ────────────────────────────────────────────────────
function listar(req, res, next) {
  try {
    const afiliados = db
      .prepare('SELECT id, nome, url FROM afiliados ORDER BY nome ASC')
      .all();
 
    return res.status(200).json(afiliados);
  } catch (err) {
    return next(err);
  }
}


// ─── GET /api/v1/afiliados/:id/produtos ──────────────────────────────────────
function listarProdutos(req, res, next) {
  try {
    const { id } = req.params;
 
    // Verifica se o afiliado existe
    const afiliado = db
      .prepare('SELECT id, nome, url FROM afiliados WHERE id = ?')
      .get(id);
 
    if (!afiliado) {
      return res.status(404).json({ erro: 'Afiliado não encontrado' });
    }
 
    // JOIN com categorias para trazer o nome da categoria junto
    const produtos = db
      .prepare(
        `SELECT
           p.id,
           p.nome,
           p.descricao,
           p.preco,
           p.imagem,
           c.id   AS categoria_id,
           c.nome AS categoria
         FROM produtos p
         LEFT JOIN categorias c ON c.id = p.categoria_id
         WHERE p.afiliado_id = ?
         ORDER BY p.nome ASC`
      )
      .all(id);
 
    return res.status(200).json(produtos);
  } catch (err) {
    return next(err);
  }
}

// ─── POST /api/v1/afiliados ───────────────────────────────────────────────────
function cadastrar(req, res, next) {
  try {
    const { nome, slug, logo, site } = req.body;
 
    // Mesma validação do service original
    if (!nome || !slug || !logo || !site) {
      return res.status(422).json({
        erro: 'Favor inserir todos os campos obrigatórios: Nome, Slug, Logo e Site',
      });
    }
 
    // Verifica duplicidade pelo nome (unique constraint da tabela)
    const existente = db
      .prepare('SELECT id FROM afiliados WHERE nome = ?')
      .get(nome);
 
    if (existente) {
      return res.status(422).json({ erro: `Slug "${slug}" já está em uso` });
    }
 
    // Usa o campo "url" para guardar o site (igual ao schema da conexão.js)
    const resultado = db
      .prepare('INSERT INTO afiliados (nome, url) VALUES (@nome, @url)')
      .run({ nome, url: site });
 
    const novoAfiliado = db
      .prepare('SELECT * FROM afiliados WHERE id = ?')
      .get(resultado.lastInsertRowid);
 
    return res.status(201).json(novoAfiliado);
  } catch (err) {
    return next(err);
  }
}
 
module.exports = { listar, listarProdutos, cadastrar };

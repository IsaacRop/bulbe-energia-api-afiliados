require('dotenv').config({ path: require('node:path').join(__dirname, '..', '..', '.env') });
const db = require('./conexao');
const bcrypt = require('bcryptjs');
const produtosJson = require('../data/produtos.json');

const total = db.prepare('SELECT COUNT(*) as n FROM produtos').get();
const jaSeeded = total.n > 0;

// Se o banco já tem dados mas falta a coluna tags_home, preenche (migration de dados)
if (jaSeeded) {
  const updateTagsHome = db.prepare('UPDATE produtos SET tags_home = ? WHERE id = ?');
  const semTag = db.prepare('SELECT COUNT(*) as n FROM produtos WHERE tags_home IS NULL').get();
  if (semTag.n > 0) {
    console.log('Atualizando tags_home nos produtos existentes...');
    for (const p of produtosJson) {
      const tag = p.tags_home ? p.tags_home.join(',') : null;
      updateTagsHome.run(tag, p.id);
    }
    console.log(`✅ tags_home atualizado em ${semTag.n} produto(s).`);
  } else {
    console.log('Seed já executado e tags_home já preenchido — nada a fazer.');
  }
  process.exit(0);
}

const insertAfiliado = db.prepare(
  'INSERT OR IGNORE INTO afiliados (nome, slug, logo, site) VALUES (@nome, @slug, @logo, @site)'
);

const afiliados = [
  { nome: 'Amazon',       slug: 'amazon',       logo: 'icon-amazon.png',   site: 'https://www.amazon.com.br' },
  { nome: 'Araujo',       slug: 'araujo',        logo: 'icon-araujo.png',   site: 'https://www.araujo.com.br' },
  { nome: 'Leroy Merlin', slug: 'leroy-merlin',  logo: 'icon-leroy.png',    site: 'https://www.leroymerlin.com.br' },
  { nome: 'Ponto Frio',   slug: 'ponto-frio',    logo: 'icon-ponto.png',    site: 'https://www.pontofrio.com.br' },
  { nome: 'Positivo',     slug: 'positivo',      logo: 'icon-positivo.png', site: 'https://www.meupositivo.com.br' },
];

for (const a of afiliados) insertAfiliado.run(a);

const insertCategoria = db.prepare('INSERT OR IGNORE INTO categorias (nome) VALUES (?)');
const categorias = ['Energia Solar', 'Casa Inteligente', 'Esporte e Lazer', 'Eletrônicos', 'Eletrodomésticos'];
for (const c of categorias) insertCategoria.run(c);

const getAfiliado = db.prepare('SELECT id FROM afiliados WHERE nome = ?');
const getCategoria = db.prepare('SELECT id FROM categorias WHERE nome = ?');
const insertProduto = db.prepare(`
  INSERT INTO produtos (nome, descricao, preco, imagem, link_afiliado, tags_home, afiliado_id, categoria_id)
  VALUES (@nome, @descricao, @preco, @imagem, @link_afiliado, @tags_home, @afiliado_id, @categoria_id)
`);

let produtosInseridos = 0;
for (const p of produtosJson) {
  const afiliado = getAfiliado.get(p.loja);
  if (!afiliado) {
    console.warn(`Afiliado não encontrado: "${p.loja}" (produto: ${p.nome}) — pulando.`);
    continue;
  }
  const categoria = getCategoria.get(p.categoria);
  insertProduto.run({
    nome: p.nome,
    descricao: p.descricao || null,
    preco: p.preco,
    imagem: p.imagem || null,
    link_afiliado: p.linkAfiliado || null,
    tags_home: p.tags_home ? p.tags_home.join(',') : null,
    afiliado_id: afiliado.id,
    categoria_id: categoria ? categoria.id : null,
  });
  produtosInseridos++;
}

const senhaHash = bcrypt.hashSync('admin123', 10);
db.prepare(
  'INSERT OR IGNORE INTO usuarios (nome, email, senha, papel) VALUES (?, ?, ?, ?)'
).run('Administrador', 'admin@bulbe.com', senhaHash, 'admin');

console.log('✅ Seed executado com sucesso!');
console.log(`   Afiliados : ${afiliados.length}`);
console.log(`   Categorias: ${categorias.length}`);
console.log(`   Produtos  : ${produtosInseridos}`);
console.log('   Admin     : admin@bulbe.com / admin123');

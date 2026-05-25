process.env.JWT_SECRET = 'test_secret';

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/db/conexao');

function gerarToken(papel = 'cliente') {
  return jwt.sign(
    { sub: 1, nome: 'Teste', papel },
    'test_secret',
    { expiresIn: '1h' }
  );
}

beforeAll(() => {
  const colunas = db.prepare("PRAGMA table_info(afiliados)").all();
  const temSlug = colunas.some(c => c.name === 'slug');

  if (temSlug) {
    db.exec(`
      INSERT OR IGNORE INTO afiliados (nome, slug, logo, site)
      VALUES ('Amazon', 'amazon', 'https://logo.com/amazon.png', 'https://amazon.com');
    `);
  } else {
    db.exec(`
      INSERT OR IGNORE INTO afiliados (nome, logo, site)
      VALUES ('Amazon', 'https://logo.com/amazon.png', 'https://amazon.com');
    `);
  }

  db.exec(`
    INSERT OR IGNORE INTO categorias (nome)
    VALUES ('Energia Solar');
  `);

  const afiliado = db.prepare('SELECT id FROM afiliados WHERE nome = ?').get('Amazon');
  const categoria = db.prepare('SELECT id FROM categorias WHERE nome = ?').get('Energia Solar');

  db.prepare(`
    INSERT OR IGNORE INTO produtos (id, nome, preco, afiliado_id, categoria_id)
    VALUES (1, 'Produto Teste', 99.9, ?, ?)
  `).run(afiliado.id, categoria.id);
});

const produtoValido = {
  nome: 'Produto Novo',
  preco: 99.9,
  categoria: 'Energia Solar',
  loja: 'Amazon',
};

const afiliadoValido = {
  nome: `Afiliado Teste ${Date.now()}`,
  slug: `afiliado-teste-${Date.now()}`,
  logo: 'https://logo.com/img.png',
  site: 'https://afiliado.com',
};

describe('POST /produtos', () => {
  test('sem token - espera 401', async () => {
    const res = await request(app).post('/api/v1/produtos').send(produtoValido);
    expect(res.status).toBe(401);
  });

  test('com token de cliente - espera 403', async () => {
    const res = await request(app)
      .post('/api/v1/produtos')
      .set('Authorization', `Bearer ${gerarToken('cliente')}`)
      .send(produtoValido);
    expect(res.status).toBe(403);
  });

  test('com token de admin - espera 201', async () => {
    const res = await request(app)
      .post('/api/v1/produtos')
      .set('Authorization', `Bearer ${gerarToken('admin')}`)
      .send(produtoValido);
    expect(res.status).toBe(201);
  });
});

describe('PUT /produtos/:id', () => {
  test('sem token - espera 401', async () => {
    const res = await request(app).put('/api/v1/produtos/1').send({ preco: 50 });
    expect(res.status).toBe(401);
  });

  test('com token de cliente - espera 403', async () => {
    const res = await request(app)
      .put('/api/v1/produtos/1')
      .set('Authorization', `Bearer ${gerarToken('cliente')}`)
      .send({ preco: 50 });
    expect(res.status).toBe(403);
  });

  test('com token de admin - espera 200', async () => {
    const res = await request(app)
      .put('/api/v1/produtos/1')
      .set('Authorization', `Bearer ${gerarToken('admin')}`)
      .send({ preco: 50 });
    expect(res.status).toBe(200);
  });
});

describe('DELETE /produtos/:id', () => {
  test('sem token - espera 401', async () => {
    const res = await request(app).delete('/api/v1/produtos/1');
    expect(res.status).toBe(401);
  });

  test('com token de cliente - espera 403', async () => {
    const res = await request(app)
      .delete('/api/v1/produtos/1')
      .set('Authorization', `Bearer ${gerarToken('cliente')}`);
    expect(res.status).toBe(403);
  });

  test('com token de admin - espera 200 ou 404', async () => {
    const res = await request(app)
      .delete('/api/v1/produtos/1')
      .set('Authorization', `Bearer ${gerarToken('admin')}`);
    expect([200, 204, 404]).toContain(res.status);
  });
});

describe('POST /afiliados', () => {
  test('sem token - espera 401', async () => {
    const res = await request(app).post('/api/v1/afiliados').send(afiliadoValido);
    expect(res.status).toBe(401);
  });

  test('com token de cliente - espera 403', async () => {
    const res = await request(app)
      .post('/api/v1/afiliados')
      .set('Authorization', `Bearer ${gerarToken('cliente')}`)
      .send(afiliadoValido);
    expect(res.status).toBe(403);
  });

  test('com token de admin - espera 201', async () => {
    const res = await request(app)
      .post('/api/v1/afiliados')
      .set('Authorization', `Bearer ${gerarToken('admin')}`)
      .send(afiliadoValido);
    expect(res.status).toBe(201);
  });
});
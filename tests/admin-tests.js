// admin-tests.js — Testes de integração para o adminMiddleware (#92)

const request = require('supertest');
const jwt     = require('jsonwebtoken');
const app     = require('../src/app');

const SECRET = process.env.JWT_SECRET || 'bulbe_energia_jwt_secret_key_2024';

function tokenAdmin() {
  return jwt.sign({ sub: 1, nome: 'Admin', papel: 'admin' },    SECRET, { expiresIn: '1h' });
}

function tokenCliente() {
  return jwt.sign({ sub: 9997, nome: 'Cliente', papel: 'cliente' }, SECRET, { expiresIn: '1h' });
}

const produtoValido = {
  nome: 'Produto Admin Test',
  preco: 99.90,
  categoria: 'Eletrônicos',
  loja: 'Amazon',
  imagem: 'test.jpg',
  linkAfiliado: 'https://example.com',
};

describe('adminMiddleware — controle de acesso por papel', () => {

  // ── POST /produtos ────────────────────────────────────────

  describe('POST /api/v1/produtos', () => {
    test('sem token retorna 401', async () => {
      const res = await request(app).post('/api/v1/produtos').send(produtoValido);
      expect(res.statusCode).toBe(401);
    });

    test('com token de cliente retorna 403', async () => {
      const res = await request(app)
        .post('/api/v1/produtos')
        .set('Authorization', `Bearer ${tokenCliente()}`)
        .send(produtoValido);
      expect(res.statusCode).toBe(403);
    });

    test('com token de admin retorna 201', async () => {
      const res = await request(app)
        .post('/api/v1/produtos')
        .set('Authorization', `Bearer ${tokenAdmin()}`)
        .send(produtoValido);
      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty('nome', produtoValido.nome);
    });
  });

  // ── PUT /produtos ─────────────────────────────────────────

  describe('PUT /api/v1/produtos/:id', () => {
    test('sem token retorna 401', async () => {
      const res = await request(app).put('/api/v1/produtos/1').send({ preco: 50 });
      expect(res.statusCode).toBe(401);
    });

    test('com token de cliente retorna 403', async () => {
      const res = await request(app)
        .put('/api/v1/produtos/1')
        .set('Authorization', `Bearer ${tokenCliente()}`)
        .send({ preco: 50 });
      expect(res.statusCode).toBe(403);
    });

    test('com token de admin retorna 200', async () => {
      const res = await request(app)
        .put('/api/v1/produtos/1')
        .set('Authorization', `Bearer ${tokenAdmin()}`)
        .send({ preco: 299.90 });
      expect(res.statusCode).toBe(200);
    });
  });

  // ── DELETE /produtos ──────────────────────────────────────

  describe('DELETE /api/v1/produtos/:id', () => {
    test('sem token retorna 401', async () => {
      const res = await request(app).delete('/api/v1/produtos/99999');
      expect(res.statusCode).toBe(401);
    });

    test('com token de cliente retorna 403', async () => {
      const res = await request(app)
        .delete('/api/v1/produtos/99999')
        .set('Authorization', `Bearer ${tokenCliente()}`);
      expect(res.statusCode).toBe(403);
    });

    test('com token de admin e ID inexistente retorna 404', async () => {
      const res = await request(app)
        .delete('/api/v1/produtos/99999')
        .set('Authorization', `Bearer ${tokenAdmin()}`);
      expect(res.statusCode).toBe(404);
    });
  });

  // ── POST /afiliados ───────────────────────────────────────

  describe('POST /api/v1/afiliados', () => {
    test('sem token retorna 401', async () => {
      const res = await request(app)
        .post('/api/v1/afiliados')
        .send({ nome: 'Teste', slug: 'teste', logo: 'logo.png', site: 'https://teste.com' });
      expect(res.statusCode).toBe(401);
    });

    test('com token de cliente retorna 403', async () => {
      const res = await request(app)
        .post('/api/v1/afiliados')
        .set('Authorization', `Bearer ${tokenCliente()}`)
        .send({ nome: 'Teste', slug: 'teste', logo: 'logo.png', site: 'https://teste.com' });
      expect(res.statusCode).toBe(403);
    });
  });

});

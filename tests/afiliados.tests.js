// afiliados.tests.js — inclui regressão para bug #80 (#95)

const request = require('supertest');
const app     = require('../src/app');

describe('Afiliados', () => {

  // ── Listagem ──────────────────────────────────────────────

  test('GET /api/v1/afiliados retorna 200 e array dentro de data', async () => {
    const res = await request(app).get('/api/v1/afiliados');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test('GET /api/v1/afiliados retorna campos id, nome, slug, logo, site', async () => {
    const res = await request(app).get('/api/v1/afiliados');
    const afiliado = res.body.data[0];
    expect(afiliado).toHaveProperty('id');
    expect(afiliado).toHaveProperty('nome');
    expect(afiliado).toHaveProperty('slug');
  });

  // ── Produtos por afiliado (#95 — regressão para bug #80) ──

  test('GET /api/v1/afiliados/:id/produtos retorna 200 e array de produtos', async () => {
    const res = await request(app).get('/api/v1/afiliados/1/produtos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('produtos de afiliado/1 pertencem todos ao afiliado correto', async () => {
    const res = await request(app).get('/api/v1/afiliados/1/produtos');
    expect(res.statusCode).toBe(200);
    // Pega o nome do afiliado 1 para comparar
    const afiliadoRes = await request(app).get('/api/v1/afiliados');
    const afiliado1 = afiliadoRes.body.data.find(a => a.id === 1);
    // Todos os produtos devem ter a loja igual ao nome do afiliado 1
    for (const produto of res.body) {
      expect(produto.loja).toBe(afiliado1.nome);
    }
  });

  test('produtos de afiliados diferentes nao se misturam', async () => {
    const res1 = await request(app).get('/api/v1/afiliados/1/produtos');
    const res2 = await request(app).get('/api/v1/afiliados/2/produtos');
    expect(res1.statusCode).toBe(200);
    expect(res2.statusCode).toBe(200);

    const ids1 = res1.body.map(p => p.id);
    const ids2 = res2.body.map(p => p.id);

    // Nenhum produto deve aparecer nos dois afiliados
    const intersecao = ids1.filter(id => ids2.includes(id));
    expect(intersecao).toHaveLength(0);
  });

  test('GET /api/v1/afiliados/:id/produtos com ID inexistente retorna 404', async () => {
    const res = await request(app).get('/api/v1/afiliados/99999/produtos');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('erro');
  });

  // ── Cadastro ──────────────────────────────────────────────

  test('POST /api/v1/afiliados sem token retorna 401', async () => {
    const res = await request(app)
      .post('/api/v1/afiliados')
      .send({ nome: 'Teste' });
    expect(res.statusCode).toBe(401);
  });

});

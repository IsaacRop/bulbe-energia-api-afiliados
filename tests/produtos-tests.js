process.env.JWT_SECRET = 'test_secret';
const request = require('supertest');
const app = require('../src/app');

describe('Produtos', () => {
  test('GET /api/v1/produtos retorna 200 e data array', async () => {
    const res = await request(app).get('/api/v1/produtos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/v1/produtos/:id com ID inexistente retorna 404', async () => {
    const res = await request(app).get('/api/v1/produtos/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('erro');
  });

  test('POST /api/v1/produtos sem token retorna 401', async () => {
    const res = await request(app)
      .post('/api/v1/produtos')
      .send({ nome: 'Produto Teste', preco: 99.9, categoria: 'Eletrônicos', loja: 'Amazon' });
    expect(res.statusCode).toBe(401);
  });

  test('GET /api/v1/produtos?search=solar retorna produtos filtrados', async () => {
    const res = await request(app).get('/api/v1/produtos?search=solar');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/v1/produtos?categoria=Eletrônicos retorna produtos da categoria', async () => {
    const res = await request(app).get('/api/v1/produtos?categoria=Eletr%C3%B4nicos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('PUT /api/v1/produtos/1 sem token retorna 401', async () => {
    const res = await request(app).put('/api/v1/produtos/1').send({ nome: 'Novo Nome' });
    expect(res.statusCode).toBe(401);
  });

  test('DELETE /api/v1/produtos/1 sem token retorna 401', async () => {
    const res = await request(app).delete('/api/v1/produtos/1');
    expect(res.statusCode).toBe(401);
  });
});

const request = require('supertest');
const app = require('../src/app');

describe('Favoritos', () => {
  test('GET /api/v1/favoritos sem token retorna 401', async () => {
    const res = await request(app).get('/api/v1/favoritos');
    expect(res.statusCode).toBe(401);
  });

  test('POST /api/v1/favoritos sem token retorna 401', async () => {
    const res = await request(app).post('/api/v1/favoritos').send({ produtoId: 1 });
    expect(res.statusCode).toBe(401);
  });

  test('DELETE /api/v1/favoritos/1 sem token retorna 401', async () => {
    const res = await request(app).delete('/api/v1/favoritos/1');
    expect(res.statusCode).toBe(401);
  });
});

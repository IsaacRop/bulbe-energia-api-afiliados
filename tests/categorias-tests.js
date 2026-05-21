const request = require('supertest');
const app = require('../src/app');

describe('Categorias', () => {
  test('GET /api/v1/categorias retorna 200 e data array', async () => {
    const res = await request(app).get('/api/v1/categorias');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/v1/categorias retorna ao menos 1 categoria', async () => {
    const res = await request(app).get('/api/v1/categorias');
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});

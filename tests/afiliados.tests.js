const request = require('supertest');
const app = require('../src/app');

describe('Afiliados', () => {
  test('GET /api/v1/afiliados retorna 200 e array', async () => {
    const res = await request(app).get('/api/v1/afiliados');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/v1/afiliados/:id/produtos com ID inexistente retorna 404', async () => {
    const res = await request(app).get('/api/v1/afiliados/99999/produtos');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('erro');
  });

  test('POST /api/v1/afiliados sem campos obrigatórios retorna 422', async () => {
    const res = await request(app)
      .post('/api/v1/afiliados')
      .send({ nome: 'Teste' });
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty('erro');
  });
});

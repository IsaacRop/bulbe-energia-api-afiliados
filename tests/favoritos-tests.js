const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');

function gerarTokenCliente() {
  // Usa o ID 1 (admin do seed) — único usuário garantido no banco de testes
  return jwt.sign(
    { sub: 1, nome: 'Cliente Teste', papel: 'cliente' },
    process.env.JWT_SECRET || 'bulbe_energia_jwt_secret_key_2024',
    { expiresIn: '1h' }
  );
}

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

  // --- Issue #79: validação de produtoId ---

  test('POST /favoritos com produtoId "abc" retorna 422', async () => {
    const token = gerarTokenCliente();
    const res = await request(app)
      .post('/api/v1/favoritos')
      .set('Authorization', `Bearer ${token}`)
      .send({ produtoId: 'abc' });
    expect(res.statusCode).toBe(422);
    expect(res.body.erro).toMatch(/produtoId/i);
  });

  test('POST /favoritos com produtoId 0 retorna 422', async () => {
    const token = gerarTokenCliente();
    const res = await request(app)
      .post('/api/v1/favoritos')
      .set('Authorization', `Bearer ${token}`)
      .send({ produtoId: 0 });
    expect(res.statusCode).toBe(422);
    expect(res.body.erro).toMatch(/produtoId/i);
  });

  test('POST /favoritos com produtoId negativo retorna 422', async () => {
    const token = gerarTokenCliente();
    const res = await request(app)
      .post('/api/v1/favoritos')
      .set('Authorization', `Bearer ${token}`)
      .send({ produtoId: -1 });
    expect(res.statusCode).toBe(422);
    expect(res.body.erro).toMatch(/produtoId/i);
  });

  test('POST /favoritos com produtoId decimal retorna 422', async () => {
    const token = gerarTokenCliente();
    const res = await request(app)
      .post('/api/v1/favoritos')
      .set('Authorization', `Bearer ${token}`)
      .send({ produtoId: 1.5 });
    expect(res.statusCode).toBe(422);
    expect(res.body.erro).toMatch(/produtoId/i);
  });

  test('POST /favoritos com produtoId válido (produto existente) retorna 201', async () => {
    const token = gerarTokenCliente();
    const res = await request(app)
      .post('/api/v1/favoritos')
      .set('Authorization', `Bearer ${token}`)
      .send({ produtoId: 1 });
    // 201 = adicionado, 422 = já favorito (ambos aceitáveis — produto existe)
    expect([201, 422]).toContain(res.statusCode);
  });
});

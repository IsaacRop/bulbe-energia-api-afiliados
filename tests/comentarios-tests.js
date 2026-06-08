const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');

function gerarToken(payload) {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'bulbe_energia_jwt_secret_key_2024',
    { expiresIn: '1h' }
  );
}

function gerarTokenCliente(sub) {
  return gerarToken({ sub, nome: 'Cliente Teste', papel: 'cliente' });
}

// Os comentários têm FK para usuarios — por isso registramos usuários reais via
// /auth/register (emails únicos por execução) em vez de usar IDs arbitrários.
async function registrarUsuario(prefixo) {
  const email = `${prefixo}_${Date.now()}_${Math.random().toString(36).slice(2)}@bulbe.com`;
  const res = await request(app)
    .post('/api/v1/auth/register')
    .send({ nome: `${prefixo} Teste`, email, senha: 'senha123' });
  return res.body.id;
}

describe('Comentários', () => {
  let autorId;
  let outroId;

  beforeAll(async () => {
    autorId = await registrarUsuario('comentario_autor');
    outroId = await registrarUsuario('comentario_outro');
  });

  test('GET /api/v1/comentarios sem produtoId retorna 422', async () => {
    const res = await request(app).get('/api/v1/comentarios');
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty('erro');
  });

  test('GET /api/v1/comentarios?produtoId=99999 com produto inexistente retorna 404', async () => {
    const res = await request(app).get('/api/v1/comentarios?produtoId=99999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('erro');
  });

  test('GET /api/v1/comentarios?produtoId=1 retorna 200 e data array', async () => {
    const res = await request(app).get('/api/v1/comentarios?produtoId=1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('POST /api/v1/comentarios sem token retorna 401', async () => {
    const res = await request(app)
      .post('/api/v1/comentarios')
      .send({ produtoId: 1, conteudo: 'Muito bom!' });
    expect(res.statusCode).toBe(401);
  });

  test('POST /api/v1/comentarios sem conteudo retorna 422', async () => {
    const token = gerarTokenCliente(autorId);
    const res = await request(app)
      .post('/api/v1/comentarios')
      .set('Authorization', `Bearer ${token}`)
      .send({ produtoId: 1 });
    expect(res.statusCode).toBe(422);
    expect(res.body.erro).toMatch(/produtoId e conteudo/i);
  });

  test('POST /api/v1/comentarios com nota fora do intervalo retorna 422', async () => {
    const token = gerarTokenCliente(autorId);
    const res = await request(app)
      .post('/api/v1/comentarios')
      .set('Authorization', `Bearer ${token}`)
      .send({ produtoId: 1, conteudo: 'Muito bom!', nota: 9 });
    expect(res.statusCode).toBe(422);
    expect(res.body.erro).toMatch(/nota/i);
  });

  test('POST /api/v1/comentarios com produto inexistente retorna 404', async () => {
    const token = gerarTokenCliente(autorId);
    const res = await request(app)
      .post('/api/v1/comentarios')
      .set('Authorization', `Bearer ${token}`)
      .send({ produtoId: 99999, conteudo: 'Muito bom!' });
    expect(res.statusCode).toBe(404);
  });

  let comentarioId;

  test('POST /api/v1/comentarios com dados válidos retorna 201', async () => {
    const token = gerarTokenCliente(autorId);
    const res = await request(app)
      .post('/api/v1/comentarios')
      .set('Authorization', `Bearer ${token}`)
      .send({ produtoId: 1, conteudo: 'Muito bom, recomendo!', nota: 5 });
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data).toHaveProperty('conteudo', 'Muito bom, recomendo!');
    comentarioId = res.body.data.id;
  });

  test('PUT /api/v1/comentarios/:id sem token retorna 401', async () => {
    const res = await request(app).put(`/api/v1/comentarios/${comentarioId}`).send({ conteudo: 'Editado' });
    expect(res.statusCode).toBe(401);
  });

  test('PUT /api/v1/comentarios/:id de outro usuário retorna 403', async () => {
    const token = gerarTokenCliente(outroId);
    const res = await request(app)
      .put(`/api/v1/comentarios/${comentarioId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ conteudo: 'Editado por outro usuário' });
    expect(res.statusCode).toBe(403);
  });

  test('PUT /api/v1/comentarios/:id pelo autor retorna 200', async () => {
    const token = gerarTokenCliente(autorId);
    const res = await request(app)
      .put(`/api/v1/comentarios/${comentarioId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ conteudo: 'Editado pelo autor', nota: 4 });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('conteudo', 'Editado pelo autor');
    expect(res.body.data).toHaveProperty('nota', 4);
  });

  test('DELETE /api/v1/comentarios/:id sem token retorna 401', async () => {
    const res = await request(app).delete(`/api/v1/comentarios/${comentarioId}`);
    expect(res.statusCode).toBe(401);
  });

  test('DELETE /api/v1/comentarios/:id de outro usuário sem ser admin retorna 403', async () => {
    const token = gerarTokenCliente(outroId);
    const res = await request(app)
      .delete(`/api/v1/comentarios/${comentarioId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
  });

  test('DELETE /api/v1/comentarios/:id pelo autor retorna 204', async () => {
    const token = gerarTokenCliente(autorId);
    const res = await request(app)
      .delete(`/api/v1/comentarios/${comentarioId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });

  test('DELETE /api/v1/comentarios/:id inexistente retorna 404', async () => {
    const token = gerarTokenCliente(autorId);
    const res = await request(app)
      .delete('/api/v1/comentarios/999999')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
});

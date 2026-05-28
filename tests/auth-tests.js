const request = require('supertest');
const app = require('../src/app');

// E-mail único por execução para evitar conflito de UNIQUE no banco
const emailUnico = `teste_${Date.now()}@bulbe.com`;

describe('Auth — /api/v1/auth', () => {

  // ── REGISTER ──────────────────────────────────────────────

  describe('POST /auth/register', () => {

    test('cadastro válido retorna 201 e dados do usuário (sem senha)', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ nome: 'Usuário Teste', email: emailUnico, senha: 'senha123' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('nome', 'Usuário Teste');
      expect(res.body).toHaveProperty('email', emailUnico);
      expect(res.body).not.toHaveProperty('senha'); // senha nunca deve vazar
    });

    test('e-mail duplicado retorna 422', async () => {
      // emailUnico já foi cadastrado no teste anterior
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ nome: 'Outro Nome', email: emailUnico, senha: 'outrasenha' });

      expect(res.statusCode).toBe(422);
      expect(res.body).toHaveProperty('erro');
      expect(res.body.erro).toMatch(/email/i);
    });

    test('campos obrigatórios faltando (sem nome) retorna 422', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ email: 'semNome@bulbe.com', senha: 'senha123' });

      expect(res.statusCode).toBe(422);
      expect(res.body).toHaveProperty('erro');
    });

    test('campos obrigatórios faltando (sem email) retorna 422', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ nome: 'Sem Email', senha: 'senha123' });

      expect(res.statusCode).toBe(422);
      expect(res.body).toHaveProperty('erro');
    });

    test('campos obrigatórios faltando (sem senha) retorna 422', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ nome: 'Sem Senha', email: 'semSenha@bulbe.com' });

      expect(res.statusCode).toBe(422);
      expect(res.body).toHaveProperty('erro');
    });

    test('body vazio retorna 422', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({});

      expect(res.statusCode).toBe(422);
      expect(res.body).toHaveProperty('erro');
    });

  });

  // ── LOGIN ──────────────────────────────────────────────────

  describe('POST /auth/login', () => {

    test('login válido retorna 200, token JWT e dados do usuário', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'admin@bulbe.com', senha: 'admin123' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('email', 'admin@bulbe.com');
      expect(res.body.user).not.toHaveProperty('senha'); // senha nunca deve vazar
      // Token deve ter formato JWT (3 partes separadas por ponto)
      expect(res.body.token.split('.')).toHaveLength(3);
    });

    test('login com papel admin retorna user.papel = "admin"', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'admin@bulbe.com', senha: 'admin123' });

      expect(res.statusCode).toBe(200);
      expect(res.body.user).toHaveProperty('papel', 'admin');
    });

    test('senha errada retorna 401', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'admin@bulbe.com', senha: 'senhaErrada' });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('erro');
    });

    test('e-mail inexistente retorna 401', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'naoexiste@bulbe.com', senha: 'qualquerSenha' });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('erro');
    });

    test('sem e-mail retorna 401', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ senha: 'admin123' });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('erro');
    });

    test('sem senha retorna 401', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'admin@bulbe.com' });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('erro');
    });

    test('body vazio retorna 401', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({});

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('erro');
    });

    test('login com usuario recém cadastrado funciona corretamente', async () => {
      // Usa emailUnico cadastrado no describe de register
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: emailUnico, senha: 'senha123' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('papel', 'cliente');
    });

  });

});

<div align="center">

# ⚡ Bulbe Energia API

**Backend do sistema de e-commerce de produtos de afiliados**  
Projeto desenvolvido para a disciplina de Projeto de Desenvolvimento Backend — IBMEC

![Status](https://img.shields.io/badge/status-conclu%C3%ADdo-success)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![License](https://img.shields.io/badge/license-MIT-blue)

</div>

---

## 👥 Equipe

| Nome Completo | Matrícula | GitHub |
|---|---|---|
| Isaac | 202501007856 | [@IsaacRop](https://github.com/IsaacRop) |
| Guilherme | 202501007899 | [@Gui-Pacheco](https://github.com/Gui-Pacheco) |
| Gustavo | 202501006833 | [@Gustavo-Salles](https://github.com/Gustavo-Salles) |
| Lara | 202501524151 | [@Laragranato17](https://github.com/Laragranato17) |
| Isabella | 202502920121 | [@IsabellaAssiss](https://github.com/IsabellaAssiss) |
| José | 202508623791 | [@josevml](https://github.com/josevml) |
| Augusto | 202501347274 | [@AugustoGaipo](https://github.com/AugustoGaipo) |

---

## 📋 Sobre o Projeto

A **Bulbe Energia API** é o backend do sistema BulbeShop, um e-commerce de produtos de afiliados que conecta parceiros como Amazon, Araujo, Leroy Merlin, Ponto e Positivo em uma única plataforma. A API fornece os dados consumidos pelo frontend desenvolvido no semestre anterior, substituindo o arquivo estático `produtos.json` por endpoints RESTful com persistência em banco de dados.

---

## 🏗️ Arquitetura

O projeto segue o padrão **MVC (Model-View-Controller)** adaptado para APIs REST, com uma camada adicional de **Services** para isolar a regra de negócio dos controllers.

```
Cliente ──HTTP──▶ Routes ──▶ Controllers ──▶ Services ──▶ Models ──▶ Banco
```

- **Routes:** definem os endpoints e delegam para os controllers.
- **Controllers:** recebem a requisição, validam entrada e chamam os services.
- **Services:** concentram a regra de negócio.
- **Models:** representam as entidades e a persistência.
- **Middlewares:** tratamento de erros, autenticação JWT (RNF-02) e logs.

---

## 🔧 Tecnologias

| Categoria | Ferramenta |
|---|---|
| Runtime | Node.js 18+ |
| Framework HTTP | Express 5 |
| Dev server | Nodemon |
| Lint | ESLint (RNF-03) |
| Documentação | OpenAPI 3.1 (RNF-05) |
| Autenticação | JWT + bcryptjs (RNF-02) |
| Banco de Dados | SQLite via better-sqlite3 |

---

## ⚙️ Como Executar Localmente

### Pré-requisitos
- Node.js 18 ou superior
- npm 9 ou superior
- Git

### Passos

```bash
# 1. Clonar o repositório
git clone https://github.com/IsaacRop/bulbe-energia-api-afiliados.git
cd bulbe-energia-api-afiliados

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# edite o .env conforme necessário (JWT_SECRET obrigatório)

# 4. Subir o servidor em modo desenvolvimento (com hot reload)
npm run dev

# ou em modo produção
npm start
```

A API ficará disponível em `http://localhost:3000/api/v1`.

> **Banco de dados:** o SQLite é criado automaticamente na raiz do projeto (`bulbe.db`) na primeira execução. Não é necessário nenhum passo adicional de migração.

### Variáveis de ambiente

| Variável | Descrição | Obrigatória |
|---|---|---|
| `PORT` | Porta do servidor (padrão: 3000) | Não |
| `JWT_SECRET` | Chave secreta para assinar tokens JWT | Sim |

### Scripts disponíveis

| Script | Descrição |
|---|---|
| `npm start` | Sobe o servidor em modo produção |
| `npm run dev` | Sobe o servidor com hot reload (Nodemon) |
| `npm test` | Executa a suíte de testes |

---

## 📡 Endpoints da API

> Consulte o arquivo completo em [`docs/requisitos.md`](./docs/requisitos.md).
> Legenda de autenticação: **—** público · **JWT** requer token · **Admin** requer token de administrador.

| Verbo  | Path                           | Descrição                          | Auth  |
|--------|--------------------------------|------------------------------------|-------|
| GET    | /api/v1/health                 | Verifica se a API está no ar       | —     |
| POST   | /api/v1/auth/register          | Cadastra novo usuário (senha em hash) | —  |
| POST   | /api/v1/auth/login             | Autentica e emite token JWT        | —     |
| GET    | /api/v1/afiliados              | Lista todos os afiliados           | —     |
| POST   | /api/v1/afiliados              | Cadastra novo afiliado             | Admin |
| GET    | /api/v1/afiliados/:id/produtos | Lista produtos de um afiliado      | —     |
| GET    | /api/v1/produtos               | Lista todos os produtos            | —     |
| GET    | /api/v1/produtos?categoria=    | Filtra produtos por categoria      | —     |
| GET    | /api/v1/produtos?search=       | Busca produtos por termo           | —     |
| GET    | /api/v1/produtos/:id           | Detalhes de um produto             | —     |
| POST   | /api/v1/produtos               | Cadastra novo produto              | Admin |
| PUT    | /api/v1/produtos/:id           | Atualiza produto existente         | Admin |
| DELETE | /api/v1/produtos/:id           | Remove produto do catálogo         | Admin |
| GET    | /api/v1/categorias             | Lista todas as categorias          | —     |
| GET    | /api/v1/favoritos              | Lista favoritos do usuário         | JWT   |
| POST   | /api/v1/favoritos              | Adiciona produto aos favoritos     | JWT   |
| DELETE | /api/v1/favoritos/:id          | Remove produto dos favoritos       | JWT   |
| GET    | /api/v1/comentarios?produtoId= | Lista comentários de um produto    | —     |
| POST   | /api/v1/comentarios            | Adiciona comentário a um produto   | JWT   |
| PUT    | /api/v1/comentarios/:id        | Atualiza comentário próprio        | JWT   |
| DELETE | /api/v1/comentarios/:id        | Remove comentário (autor ou admin) | JWT   |
| GET    | /api/v1/usuarios               | Lista todos os usuários            | Admin |

---

## 📚 Documentação OpenAPI

A API é documentada via **OpenAPI 3.0.3** e exposta de duas formas:

- **Swagger UI interativo** (gerado em runtime via `swagger-jsdoc` a partir das anotações `@openapi` nas rotas): `http://localhost:3000/api-docs`
- **JSON da especificação:** `http://localhost:3000/api-docs.json`
- **Arquivo estático:** [`docs/openapi.yaml`](./docs/openapi.yaml)

---

## 🗂️ Estrutura do Repositório
```
bulbe-energia-api-afiliados/
├── docs/
│   ├── requisitos.md         # Levantamento de requisitos (Sprint 1)
│   └── openapi.yaml          # Especificação OpenAPI 3.1
├── src/
│   ├── controllers/          # Recebem requisições e respondem
│   ├── services/             # Regra de negócio
│   ├── models/               # Entidades e persistência
│   ├── routes/               # Definição dos endpoints
│   ├── middlewares/          # Auth JWT, tratamento de erros
│   ├── config/               # Configuração de ambiente
│   ├── db/
│   │   ├── conexao.js        # Conexão SQLite + criação das tabelas
│   │   └── seed.js           # População inicial do banco (idempotente)
│   ├── app.js                # Instancia o Express e middlewares
│   └── server.js             # Sobe o servidor HTTP
├── bulbe.db                  # Banco SQLite (gerado automaticamente)
├── tests/                    # Testes automatizados
├── .env.example              # Modelo de variáveis de ambiente
├── .gitignore
├── .eslintrc.json
├── package.json
├── LICENSE
└── README.md
```

---

## 🔄 Sprints

| Sprint | Foco | Status |
|--------|------|--------|
| Kickoff | Apresentação dos trabalhos do semestre anterior | ✅ Concluída |
| Sprint 1 | Setup + Elicitação de Requisitos | ✅ Concluída |
| Sprint 2 | Modelagem + Arquitetura + CRUD básico | ✅ Concluída |
| Sprint 3 | Banco de Dados (SQLite) + Autenticação JWT | ✅ Concluída |
| Sprint 4 | Testes + Documentação Final | ✅ Concluída |

---

## 📖 Referências

- SOMMERVILLE, I. *Software Engineering*. 10. ed. Pearson, 2015.
- FOWLER, M. *Patterns of Enterprise Application Architecture*. Addison-Wesley, 2002.
- RICHARDSON, L.; RUBY, S. *RESTful Web Services*. O'Reilly, 2007.
- OpenAPI Initiative. *OpenAPI Specification v3.1.0*. Disponível em: https://spec.openapis.org/oas/v3.1.0

---

## 📄 Licença

Distribuído sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
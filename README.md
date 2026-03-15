<div align="center">

# ⚡ Bulbe Energia API

**Backend do sistema de e-commerce de produtos de afiliados**  
Projeto desenvolvido para a disciplina de Projeto de Desenvolvimento Backend — IBMEC

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![License](https://img.shields.io/badge/license-MIT-blue)

</div>

---

## 👥 Equipe

| Nome Completo | Matrícula | GitHub |
|---|---|---|
| Isaac | 202501007856 | [@IsaacRop](https://github.com/IsaacRop) |
| Guilherme | 202501007899 | [@Gui-Pacheco] (https://github.com/Gui-Pacheco) |
| Gustavo | 202501006833 | [@Gustavo-Salles] (https://github.com/Gustavo-Salles) |
| Lara | 202501524151 | [@Laragranato17] (https://github.com/Laragranato17) |
| Isabella | 202502920121 | [@IsabellaAssiss] (https://github.com/IsabellaAssiss) |
| José | 202508623791 | [@josevml] (https://github.com/josevml) |
| Augusto | 202501347274 | [@AugustoGaipo] (https://github.com/AugustoGaipo) |

---

## 📋 Sobre o Projeto

A **Bulbe Energia API** é o backend do sistema BulbeShop, um e-commerce de produtos de afiliados que conecta parceiros como Amazon, Araujo, Leroy Merlin, Ponto e Positivo em uma única plataforma. A API fornece os dados consumidos pelo frontend desenvolvido no semestre anterior, substituindo o arquivo estático `produtos.json` por endpoints RESTful com persistência em banco de dados.

---

## 🏗️ Arquitetura

> *A ser preenchido na Sprint 2 após definição da arquitetura MVC.*

---

## 🔧 Tecnologias

> *A ser preenchido na Sprint 2.*

---

## ⚙️ Como Executar Localmente

> *A ser preenchido na Sprint 2.*

---

## 📡 Endpoints da API

> Consulte o arquivo completo em [`docs/requisitos.md`](./docs/requisitos.md).

| Verbo  | Path                           | Descrição                          |
|--------|--------------------------------|------------------------------------|
| GET    | /api/v1/afiliados              | Lista todos os afiliados           |
| GET    | /api/v1/afiliados/:id/produtos | Lista produtos de um afiliado      |
| GET    | /api/v1/produtos               | Lista todos os produtos            |
| GET    | /api/v1/produtos/:id           | Detalhes de um produto             |
| GET    | /api/v1/produtos?categoria=    | Filtra produtos por categoria      |
| GET    | /api/v1/produtos?search=       | Busca produtos por termo           |
| GET    | /api/v1/categorias             | Lista todas as categorias          |
| POST   | /api/v1/produtos               | Cadastra novo produto              |
| PUT    | /api/v1/produtos/:id           | Atualiza produto existente         |
| DELETE | /api/v1/produtos/:id           | Remove produto do catálogo         |
| GET    | /api/v1/favoritos              | Lista favoritos do usuário         |
| POST   | /api/v1/favoritos              | Adiciona produto aos favoritos     |
| DELETE | /api/v1/favoritos/:id          | Remove produto dos favoritos       |
| POST   | /api/v1/afiliados              | Cadastra novo afiliado             |

---

## 📚 Documentação OpenAPI

> Arquivo em [`docs/openapi.yaml`](./docs/openapi.yaml) — a ser preenchido progressivamente.

---

## 🗂️ Estrutura do Repositório
```
bulbe-energia-api-afiliados/
├── docs/
│   ├── requisitos.md
│   └── openapi.yaml
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── services/
├── tests/
├── .gitignore
├── package.json
└── README.md
```

---

## 🔄 Sprints

| Sprint | Foco | Status |
|--------|------|--------|
| Kickoff | Apresentação dos trabalhos do semestre anterior | ✅ Concluída |
| Sprint 1 | Setup + Elicitação de Requisitos | 🔄 Em andamento |
| Sprint 2 | Modelagem + Arquitetura + CRUD básico | ⏳ Aguardando |
| Sprint 3 | Banco de Dados + ORM + Testes | ⏳ Aguardando |
| Sprint 4 | Autenticação + Documentação Final | ⏳ Aguardando |

---

## 📖 Referências

- SOMMERVILLE, I. *Software Engineering*. 10. ed. Pearson, 2015.
- FOWLER, M. *Patterns of Enterprise Application Architecture*. Addison-Wesley, 2002.
- RICHARDSON, L.; RUBY, S. *RESTful Web Services*. O'Reilly, 2007.
- OpenAPI Initiative. *OpenAPI Specification v3.1.0*. Disponível em: https://spec.openapis.org/oas/v3.1.0

---

## 📄 Licença

Distribuído sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
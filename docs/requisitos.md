 # Levantamento de Requisitos — Bulbe Energia API

**Versão:** 2.0  
**Data:** 21/05/2026  
**Grupo:** Grupo-Afiliados  
**Integrantes:**

| Nome | Matrícula |
|---|---|
| Isaac | 202501007856 |
| Guilherme | 202501007899 |
| Gustavo | 202501006833 |
| Lara | 202501524151 |
| Isabella | 202502920121 |
| José | 202508623791 |
| Augusto | 202501347274 |

---

## Requisitos Funcionais

| ID    | Descrição                                                        | US Vinculada | Prioridade | Status      |
|-------|------------------------------------------------------------------|--------------|------------|-------------|
| RF-01 | Listar todos os afiliados cadastrados                            | US-01        | MUST       | Implementado |
| RF-02 | Listar produtos de um afiliado específico                        | US-02        | MUST       | Implementado |
| RF-03 | Buscar detalhes completos de um produto pelo ID                  | US-03        | MUST       | Implementado |
| RF-04 | Listar todos os produtos do catálogo                             | US-04        | MUST       | Implementado |
| RF-05 | Filtrar produtos por categoria                                   | US-05        | MUST       | Implementado |
| RF-06 | Listar todas as categorias disponíveis                           | US-06        | SHOULD     | Implementado |
| RF-07 | Adicionar produto à lista de favoritos do usuário                | US-07        | MUST       | Implementado |
| RF-08 | Listar produtos favoritos do usuário autenticado                 | US-08        | MUST       | Implementado |
| RF-09 | Remover produto da lista de favoritos                            | US-09        | MUST       | Implementado |
| RF-10 | Cadastrar novo produto no catálogo                               | US-10        | MUST       | Implementado |
| RF-11 | Buscar produtos por termo de pesquisa (nome ou descrição)        | US-11        | SHOULD     | Implementado |
| RF-12 | Cadastrar novo afiliado                                          | US-12        | SHOULD     | Implementado |
| RF-13 | Atualizar dados de um produto existente                          | US-13        | COULD      | Implementado |
| RF-14 | Remover produto do catálogo                                      | US-14        | COULD      | Implementado |
| RF-15 | Cadastrar novo usuário com senha criptografada (bcrypt)          | US-15        | MUST       | Implementado |
| RF-16 | Autenticar usuário e emitir token JWT                            | US-16        | MUST       | Implementado |
| RF-17 | Listar todos os usuários cadastrados (acesso restrito a admin)   | US-17        | SHOULD     | Implementado |

---

## Mapa de Endpoints

> **Auth:** _Não_ = público · _JWT_ = requer token válido · _Admin_ = requer token de administrador.

| Verbo  | Path                              | RF    | Auth  | Status esperado |
|--------|-----------------------------------|-------|-------|-----------------|
| GET    | /api/v1/health                    | —     | Não   | 200             |
| POST   | /api/v1/auth/register             | RF-15 | Não   | 201, 422        |
| POST   | /api/v1/auth/login                | RF-16 | Não   | 200, 401        |
| GET    | /api/v1/afiliados                 | RF-01 | Não   | 200             |
| POST   | /api/v1/afiliados                 | RF-12 | Admin | 201, 401, 403, 422 |
| GET    | /api/v1/afiliados/:id/produtos    | RF-02 | Não   | 200, 404        |
| GET    | /api/v1/produtos                  | RF-04 | Não   | 200             |
| GET    | /api/v1/produtos?categoria=:cat   | RF-05 | Não   | 200             |
| GET    | /api/v1/produtos?search=:termo    | RF-11 | Não   | 200             |
| GET    | /api/v1/produtos/:id              | RF-03 | Não   | 200, 404        |
| POST   | /api/v1/produtos                  | RF-10 | Admin | 201, 401, 403, 422 |
| PUT    | /api/v1/produtos/:id              | RF-13 | Admin | 200, 401, 403, 404 |
| DELETE | /api/v1/produtos/:id              | RF-14 | Admin | 200, 401, 403, 404 |
| GET    | /api/v1/categorias                | RF-06 | Não   | 200             |
| GET    | /api/v1/favoritos                 | RF-08 | JWT   | 200, 401        |
| POST   | /api/v1/favoritos                 | RF-07 | JWT   | 201, 401, 422   |
| DELETE | /api/v1/favoritos/:id             | RF-09 | JWT   | 200, 401, 404   |
| GET    | /api/v1/usuarios                  | RF-17 | Admin | 200, 401, 403   |

---

## Requisitos Não-Funcionais

| ID     | Categoria        | Descrição                                                                   | Status      |
|--------|------------------|-----------------------------------------------------------------------------|-------------|
| RNF-01 | Desempenho       | Endpoints de leitura respondem em ≤ 300ms (p95)                             | Atendido    |
| RNF-02 | Segurança        | Rotas de escrita exigem token de admin; favoritos exigem token JWT válido (Bearer) | Implementado |
| RNF-03 | Manutenibilidade | Código segue ESLint + padrão arquitetural MVC (Routes → Controller → Service → Model) | Implementado |
| RNF-04 | Escalabilidade   | API suporta múltiplos afiliados sem alteração estrutural                    | Atendido    |
| RNF-05 | Portabilidade    | API documentada via OpenAPI 3.0.3 acessível em `/api-docs`                  | Implementado |
| RNF-06 | Persistência     | Dados armazenados em banco SQLite com WAL e chaves estrangeiras ativadas     | Implementado |
| RNF-07 | Testabilidade    | Cobertura com Jest + Supertest (54 casos em 6 suítes: auth, afiliados, produtos, categorias, favoritos, admin) | Implementado |

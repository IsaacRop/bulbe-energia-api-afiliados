 # Levantamento de Requisitos — Bulbe Energia API

**Versão:** 1.0  
**Data:** 15/03/2026  
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

| ID    | Descrição                                                        | US Vinculada | Prioridade |
|-------|------------------------------------------------------------------|--------------|------------|
| RF-01 | Listar todos os afiliados cadastrados                            | US-01        | MUST       |
| RF-02 | Listar produtos de um afiliado específico                        | US-02        | MUST       |
| RF-03 | Buscar detalhes completos de um produto pelo ID                  | US-03        | MUST       |
| RF-04 | Listar todos os produtos do catálogo                             | US-04        | MUST       |
| RF-05 | Filtrar produtos por categoria                                   | US-05        | MUST       |
| RF-06 | Listar todas as categorias disponíveis                           | US-06        | SHOULD     |
| RF-07 | Adicionar produto à lista de favoritos do usuário                | US-07        | MUST       |
| RF-08 | Listar produtos favoritos do usuário autenticado                 | US-08        | MUST       |
| RF-09 | Remover produto da lista de favoritos                            | US-09        | MUST       |
| RF-10 | Cadastrar novo produto no catálogo                               | US-10        | MUST       |
| RF-11 | Buscar produtos por termo de pesquisa (nome ou descrição)        | US-11        | SHOULD     |
| RF-12 | Cadastrar novo afiliado                                          | US-12        | SHOULD     |
| RF-13 | Atualizar dados de um produto existente                          | US-13        | COULD      |
| RF-14 | Remover produto do catálogo                                      | US-14        | COULD      |

---

## Mapa de Endpoints

| Verbo  | Path                              | RF    | Status esperado |
|--------|-----------------------------------|-------|-----------------|
| GET    | /api/v1/afiliados                 | RF-01 | 200             |
| GET    | /api/v1/afiliados/:id/produtos    | RF-02 | 200, 404        |
| GET    | /api/v1/produtos/:id              | RF-03 | 200, 404        |
| GET    | /api/v1/produtos                  | RF-04 | 200             |
| GET    | /api/v1/produtos?categoria=:cat   | RF-05 | 200, 404        |
| GET    | /api/v1/categorias                | RF-06 | 200             |
| POST   | /api/v1/favoritos                 | RF-07 | 201, 422        |
| GET    | /api/v1/favoritos                 | RF-08 | 200             |
| DELETE | /api/v1/favoritos/:id             | RF-09 | 200, 404        |
| POST   | /api/v1/produtos                  | RF-10 | 201, 422        |
| GET    | /api/v1/produtos?search=:termo    | RF-11 | 200             |
| POST   | /api/v1/afiliados                 | RF-12 | 201, 422        |
| PUT    | /api/v1/produtos/:id              | RF-13 | 200, 404, 422   |
| DELETE | /api/v1/produtos/:id              | RF-14 | 200, 404        |

---

## Requisitos Não-Funcionais

| ID     | Categoria        | Descrição                                                        |
|--------|------------------|------------------------------------------------------------------|
| RNF-01 | Desempenho       | Endpoints de leitura respondem em ≤ 300ms (p95)                  |
| RNF-02 | Segurança        | Todas as rotas (exceto listagens públicas) exigem token JWT      |
| RNF-03 | Manutenibilidade | Código segue ESLint + padrão arquitetural MVC                    |
| RNF-04 | Escalabilidade   | API suporta múltiplos afiliados sem alteração estrutural         |
| RNF-05 | Portabilidade    | API documentada via OpenAPI 3.1 para integração com qualquer frontend |
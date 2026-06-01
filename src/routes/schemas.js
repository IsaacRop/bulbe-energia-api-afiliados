/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *
 *     Erro:
 *       type: object
 *       properties:
 *         erro:
 *           type: string
 *           example: Mensagem de erro
 *
 *     RegisterInput:
 *       type: object
 *       required: [nome, email, senha]
 *       properties:
 *         nome:
 *           type: string
 *           example: João Silva
 *         email:
 *           type: string
 *           example: joao@email.com
 *         senha:
 *           type: string
 *           example: senha123
 *
 *     LoginInput:
 *       type: object
 *       required: [email, senha]
 *       properties:
 *         email:
 *           type: string
 *           example: joao@email.com
 *         senha:
 *           type: string
 *           example: senha123
 *
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: João Silva
 *         email:
 *           type: string
 *           example: joao@email.com
 *         papel:
 *           type: string
 *           enum: [admin, cliente]
 *           example: cliente
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         user:
 *           $ref: '#/components/schemas/Usuario'
 *
 *     Afiliado:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: Amazon
 *         slug:
 *           type: string
 *           example: amazon
 *         logo:
 *           type: string
 *           example: icon-amazon.png
 *         site:
 *           type: string
 *           example: https://www.amazon.com.br
 *
 *     AfiliadoInput:
 *       type: object
 *       required: [nome, slug, logo, site]
 *       properties:
 *         nome:
 *           type: string
 *           example: Shopee
 *         slug:
 *           type: string
 *           example: shopee
 *         logo:
 *           type: string
 *           example: icon-shopee.png
 *         site:
 *           type: string
 *           example: https://shopee.com.br
 *
 *     Categoria:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: Energia Solar
 *         slug:
 *           type: string
 *           example: energia-solar
 *
 *     Produto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: Carregador e Painel Solar 21W ALLPOWERS
 *         preco:
 *           type: number
 *           example: 280.16
 *         categoria:
 *           type: string
 *           example: Energia Solar
 *         imagem:
 *           type: string
 *           example: carregador-painel.jpg
 *         linkAfiliado:
 *           type: string
 *           example: https://www.amazon.com.br/...
 *         loja:
 *           type: string
 *           example: Amazon
 *         lojalogo:
 *           type: string
 *           example: icon-amazon.png
 *         descricao:
 *           type: string
 *           example: Painel solar inteligente altamente eficiente
 *         tags_home:
 *           type: array
 *           items:
 *             type: string
 *           example: ["eco"]
 *         pagina:
 *           type: string
 *           example: /paginas/produto.html?id=1
 *         totalavali:
 *           type: integer
 *           example: 13
 *         totalstar:
 *           type: number
 *           example: 4.4
 *
 *     ProdutoInput:
 *       type: object
 *       required: [nome, preco, categoria, loja]
 *       properties:
 *         nome:
 *           type: string
 *           example: Carregador e Painel Solar 21W ALLPOWERS
 *         preco:
 *           type: number
 *           example: 280.16
 *         categoria:
 *           type: string
 *           example: Energia Solar
 *         imagem:
 *           type: string
 *           example: carregador-painel.jpg
 *         linkAfiliado:
 *           type: string
 *           example: https://www.amazon.com.br/...
 *         loja:
 *           type: string
 *           example: Amazon
 *         lojalogo:
 *           type: string
 *           example: icon-amazon.png
 *         descricao:
 *           type: string
 *           example: Painel solar inteligente altamente eficiente
 *         tags_home:
 *           type: array
 *           items:
 *             type: string
 *           example: ["eco"]
 *         pagina:
 *           type: string
 *           example: /paginas/produto.html?id=1
 *         totalavali:
 *           type: integer
 *           example: 0
 *         totalstar:
 *           type: number
 *           example: 0
 *
 *     Favorito:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "1716123456789"
 *         usuarioId:
 *           type: string
 *           example: "1"
 *         produtoId:
 *           type: integer
 *           example: 3
 *         criadoEm:
 *           type: string
 *           format: date-time
 *           example: "2025-05-20T14:32:01.000Z"
 *
 *     FavoritoInput:
 *       type: object
 *       required: [produtoId]
 *       properties:
 *         produtoId:
 *           type: integer
 *           example: 3
 */
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
 *           example: https://www.amazon.com.br/ALLPOWERS-Carregador-dobr%C3%A1vel-carregamento-smartphone/dp/B0FG2SGM6X/ref=sr_1_5?sr=8-5
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
 *       required: [nome, preco, categoria, imagem, linkAfiliado, loja, lojalogo, descricao]
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
 *           example: https://www.amazon.com.br/ALLPOWERS-Carregador-dobr%C3%A1vel-carregamento-smartphone/dp/B0FG2SGM6X/ref=sr_1_5?sr=8-5
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
 *     Favorito:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         produtoId:
 *           type: integer
 *           example: 3
 *
 *     FavoritoInput:
 *       type: object
 *       required: [produtoId]
 *       properties:
 *         produtoId:
 *           type: integer
 *           example: 3
 */
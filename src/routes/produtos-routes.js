const { Router } = require('express');
const ProdutosController = require('../controllers/produtos-controller');
const authMiddleware = require('../middlewares/auth');

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos
 */
 
/**
 * @openapi
 * /produtos:
 *   post:
 *     tags: [Produtos]
 *     summary: Cadastra um novo produto
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoInput'
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       422:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */

router.post('/', authMiddleware, ProdutosController.cadastrar);

/**
 * @openapi
 * /produtos:
 *   get:
 *     tags: [Produtos]
 *     summary: Lista todos os produtos
 *     parameters:
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Termo para busca por nome ou descrição
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */

router.get('/', ProdutosController.listar);

/**
 * @openapi
 * /produtos/{id}:
 *   get:
 *     tags: [Produtos]
 *     summary: Busca um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */

router.get('/:id', ProdutosController.buscarPorId);

/**
 * @openapi
 * /produtos/{id}:
 *   put:
 *     tags: [Produtos]
 *     summary: Atualiza um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoInput'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       422:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */

router.put('/:id', ProdutosController.atualizar);

/**
 * @openapi
 * /produtos/{id}:
 *   delete:
 *     tags: [Produtos]
 *     summary: Remove um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       204:
 *         description: Produto removido com sucesso
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.delete('/:id', ProdutosController.remover);

module.exports = router;

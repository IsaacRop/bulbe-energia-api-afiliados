const { Router } = require('express');
const ComentariosController = require('../controllers/comentarios-controller');
const authMiddleware = require('../middlewares/auth');

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Comentários
 *   description: Comentários e avaliações dos produtos
 */

/**
 * @openapi
 * /comentarios:
 *   get:
 *     tags: [Comentários]
 *     summary: Lista os comentários de um produto
 *     parameters:
 *       - in: query
 *         name: produtoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comentario'
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       422:
 *         description: Parâmetro produtoId ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get('/', ComentariosController.listar);

/**
 * @openapi
 * /comentarios:
 *   post:
 *     tags: [Comentários]
 *     summary: Adiciona um comentário a um produto
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComentarioInput'
 *     responses:
 *       201:
 *         description: Comentário cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Comentario'
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       422:
 *         description: Campos obrigatórios ausentes ou inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.post('/', authMiddleware, ComentariosController.cadastrar);

/**
 * @openapi
 * /comentarios/{id}:
 *   put:
 *     tags: [Comentários]
 *     summary: Atualiza um comentário próprio pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conteudo:
 *                 type: string
 *                 example: Produto excelente, recomendo!
 *               nota:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Comentário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Comentario'
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       403:
 *         description: Você só pode editar os seus próprios comentários
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Comentário não encontrado
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
router.put('/:id', authMiddleware, ComentariosController.atualizar);

/**
 * @openapi
 * /comentarios/{id}:
 *   delete:
 *     tags: [Comentários]
 *     summary: Remove um comentário pelo ID (autor ou administrador)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário
 *     responses:
 *       204:
 *         description: Comentário removido com sucesso
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       403:
 *         description: Você não tem permissão para remover este comentário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Comentário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.delete('/:id', authMiddleware, ComentariosController.remover);

module.exports = router;

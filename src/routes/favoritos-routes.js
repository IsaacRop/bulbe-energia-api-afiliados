const { Router } = require('express');
const FavoritosController = require('../controllers/favoritos-controller');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * tags:
 *   name: Favoritos
 *   description: Gerenciamento de favoritos do usuário autenticado
 */
 
/**
 * @openapi
 * /favoritos:
 *   get:
 *     tags: [Favoritos]
 *     summary: Lista os favoritos do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorito'
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */

router.get('/', FavoritosController.listar);

/**
 * @openapi
 * /favoritos:
 *   post:
 *     tags: [Favoritos]
 *     summary: Adiciona um produto aos favoritos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoritoInput'
 *     responses:
 *       201:
 *         description: Favorito adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorito'
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */

router.post('/', FavoritosController.adicionar);

/**
 * @openapi
 * /favoritos/{id}:
 *   delete:
 *     tags: [Favoritos]
 *     summary: Remove um favorito pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do favorito a ser removido
 *     responses:
 *       204:
 *         description: Favorito removido com sucesso
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Favorito não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */

router.delete('/:id', FavoritosController.remover);

module.exports = router;
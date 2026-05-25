const express = require('express');
const afiliadosController = require('../controllers/afiliados-controller');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Afiliados
 *   description: Gerenciamento de afiliados
 */

/**
 * @openapi
 * /afiliados:
 *   get:
 *     tags: [Afiliados]
 *     summary: Lista todos os afiliados
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                data:
 *                  type: array  
 *                  items:
 *                    $ref: '#/components/schemas/Afiliado'
 */
router.get('/', afiliadosController.listar);

/**
 * @openapi
 * /afiliados:
 *   post:
 *     tags: [Afiliados]
 *     summary: Cadastra um novo afiliado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AfiliadoInput'
 *     responses:
 *       201:
 *         description: Afiliado cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Afiliado'
 *       422:
 *         description: Dados inválidos ou slug já em uso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.post('/', authMiddleware, adminMiddleware, afiliadosController.cadastrar);

/**
 * @openapi
 * /afiliados/{id}/produtos:
 *   get:
 *     tags: [Afiliados]
 *     summary: Lista os produtos de um afiliado pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do afiliado
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Afiliado não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get('/:id/produtos', afiliadosController.listarProdutos);

module.exports = router;

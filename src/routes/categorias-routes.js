const { Router } = require('express');
const CategoriasController = require('../controllers/categorias-controller');

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Categorias
 *   description: Listagem de categorias de produtos
 */

/**
 * @openapi
 * /categorias:
 *   get:
 *     tags: [Categorias]
 *     summary: Lista todas as categorias disponíveis
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
 *                     $ref: '#/components/schemas/Categoria'
 */
router.get('/', CategoriasController.listar);

module.exports = router;

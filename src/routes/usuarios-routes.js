const express = require('express');
const usuariosController = require('../controllers/usuarios-controller');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários (acesso restrito a administradores)
 */

/**
 * @openapi
 * /usuarios:
 *   get:
 *     tags: [Usuários]
 *     summary: Lista todos os usuários cadastrados (somente admin)
 *     security:
 *       - bearerAuth: []
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *                       email:
 *                         type: string
 *                       papel:
 *                         type: string
 *                         enum: [admin, cliente]
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       403:
 *         description: Acesso restrito a administradores
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get('/', authMiddleware, adminMiddleware, usuariosController.listar);

module.exports = router;

const express = require('express');
const afiliadosController = require('../controllers/afiliados-controller');

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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Afiliado'
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

router.post('/',afiliadosController.cadastrar);

module.exports = router;

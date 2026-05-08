const express = require('express');
const produtosController = require('../controllers/produtos-controller');

const router = express.Router();

router.get('/', produtosController.listar);
router.get('/:id', produtosController.buscarPorId);

module.exports = router;

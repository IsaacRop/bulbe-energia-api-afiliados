const express = require('express');
const afiliadosController = require('../controllers/afiliados-controller');

const router = express.Router();

router.get('/', afiliadosController.listar);
router.get('/:id/produtos', afiliadosController.listarProdutos);
router.post('/',afiliadosController.cadastrar);

module.exports = router;

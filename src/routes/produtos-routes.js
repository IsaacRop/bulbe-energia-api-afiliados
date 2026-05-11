const express = require('express');
const router = express.Router();
const ProdutosController = require('../controllers/produtos-controller');


router.put('/:id', ProdutosController.atualizar);
router.delete('/:id', ProdutosController.remover);

module.exports = router;
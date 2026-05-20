const { Router } = require('express');
const CategoriasController = require('../controllers/categorias-controller');

const router = Router();

router.get('/', CategoriasController.listar);

module.exports = router;
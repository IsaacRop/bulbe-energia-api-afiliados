const { Router } = require('express');
const ProdutosController = require('../controllers/produtos-controller');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.post('/', authMiddleware, ProdutosController.cadastrar);
router.get('/', ProdutosController.listar);
router.get('/:id', ProdutosController.buscarPorId);
router.put('/:id', ProdutosController.atualizar);

module.exports = router;

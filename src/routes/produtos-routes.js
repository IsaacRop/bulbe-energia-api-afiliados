const { Router } = require('express');
const ProdutosController = require('../controllers/produtos-controller');
const authMiddleware = require('../middlewares/auth');

const router = Router();

// RF-10: Cadastro de produto
// RNF-02: Exige autenticação para operações de escrita
router.post('/', authMiddleware, ProdutosController.cadastrar);

module.exports = router;
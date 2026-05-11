const ProdutosController = require('../controllers/produtos-controller');


router.put('/:id', ProdutosController.atualizar);

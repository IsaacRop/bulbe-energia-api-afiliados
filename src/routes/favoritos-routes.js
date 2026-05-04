const { Router } = require('express');
const FavoritosController = require('../controllers/favoritos-controller');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.use(authMiddleware); // todas as rotas exigem autenticação

router.get('/', FavoritosController.listar);
router.post('/', FavoritosController.adicionar);
router.delete('/:id', FavoritosController.remover);

module.exports = router;
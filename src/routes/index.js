const express = require('express');
const afiliadosRoutes = require('./afiliados-routes');
const favoritosRoutes = require('./favoritos-routes');
const produtosRoutes = require('./produtos-routes');
const authRoutes = require('./auth-routes');
const categoriasRoutes = require('./categorias-routes');

const router = express.Router();

router.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

router.use('/auth', authRoutes);
router.use('/afiliados', afiliadosRoutes);
router.use('/favoritos', favoritosRoutes);
router.use('/categorias', categoriasRoutes);
router.use('/produtos', produtosRoutes);

module.exports = router;

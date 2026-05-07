const express = require('express');
const afiliadosRoutes = require('./afiliados-routes');
const favoritosRoutes = require('./favoritos-routes');
const produtosRoutes = require('./produtos-routes');

const router = express.Router();

router.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

router.use('/afiliados', afiliadosRoutes);
router.use('/favoritos', favoritosRoutes);
router.use('/produtos', produtosRoutes);

module.exports = router;

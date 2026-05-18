const express = require('express');
const afiliadosRoutes = require('./afiliados-routes');
const favoritosRoutes = require('./favoritos-routes');
const produtosRoutes = require('./produtos-routes');
const authRoutes = require('./auth-routes');

const router = express.Router();

router.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Rota pública — não exige token
router.use('/auth', authRoutes);

// Rotas protegidas — token aplicado dentro de cada router
router.use('/afiliados', afiliadosRoutes);
router.use('/favoritos', favoritosRoutes);
router.use('/produtos', produtosRoutes);

module.exports = router;

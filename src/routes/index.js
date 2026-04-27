const express = require('express');
const afiliadosRoutes = require('./afiliados-routes');

const router = express.Router();

router.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

router.use('/afiliados', afiliadosRoutes);

module.exports = router;

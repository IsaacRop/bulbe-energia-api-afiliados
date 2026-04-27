const express = require('express');
const afiliadosController = require('../controllers/afiliados-controller');

const router = express.Router();

router.get('/', afiliadosController.listar);

module.exports = router;

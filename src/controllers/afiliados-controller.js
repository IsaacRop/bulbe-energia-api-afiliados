const afiliadoService = require('../services/afiliados-service');

function listar(req, res, next) {
  try {
    const afiliados = afiliadoService.listarTodos();
    return res.status(200).json(afiliados);
  } catch (err) {
    return next(err);
  }
}

module.exports = { listar };

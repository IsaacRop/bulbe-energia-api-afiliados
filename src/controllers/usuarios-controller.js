const usuariosService = require('../services/usuarios-service');

function listar(req, res, next) {
  try {
    const usuarios = usuariosService.listarTodos();
    return res.status(200).json({ data: usuarios });
  } catch (err) {
    return next(err);
  }
}

module.exports = { listar };

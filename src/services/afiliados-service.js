const afiliadoModel = require('../models/afiliados-model');

function listarTodos() {
  return afiliadoModel.findAll();
}

module.exports = { listarTodos };

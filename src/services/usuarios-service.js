const usersModel = require('../models/users-model');

function listarTodos() {
  return usersModel.findAll();
}

module.exports = { listarTodos };

const afiliadoModel = require('../models/afiliados-model');

function listarTodos() {
  return afiliadoModel.findAll();
}

function cadastrar(dados){
  const {nome, slug, logo, site } = dados;

  if(!nome || !slug || !logo || !site) {
    const err = new Error("Favor inserir todos os campos obrigatórios: Nome, Slug, Logo e Site");
    err.status = 422;
    throw err;
  }

  if(afiliadoModel.findBySlug(slug)){
    const err = new Error(`Slug "${slug}" já está em uso`);
    err.status = 422;
    throw err;
  }

  return afiliadoModel.create({nome,slug,logo,site});
}

module.exports = { listarTodos, cadastrar };

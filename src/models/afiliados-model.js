const afiliados = require('../data/afiliados.json');

function findAll() {
  return afiliados;
}

function findById(id) {
  return afiliados.find((a) => a.id === Number(id));
}

function findBySlug(slug){
  return afiliados.find((a) => a.slug === slug);
}

function create(dados) {
  const novoId = afiliados.length > 0 ? Math.max(...afiliados.map((a) => a.id)) + 1 : 1;

  const novoAfiliado = {id: novoId, ...dados};
  afiliados.push(novoAfiliado);
  return novoAfiliado;
}



module.exports = { findAll, findById, findBySlug, create };

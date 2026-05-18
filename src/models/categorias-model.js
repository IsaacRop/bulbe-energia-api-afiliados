const produtos = require('../data/produtos.json');

const CategoriasModel = {
  findByCategoria(categoria) {
    return produtos.filter(
      (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
    );
  },

  findCategoriasUnicas() {
    const todasCategorias = produtos.map((p) => p.categoria);
    return [...new Set(todasCategorias)];
  }
};

module.exports = CategoriasModel;
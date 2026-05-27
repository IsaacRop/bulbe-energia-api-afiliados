const CategoriasModel = require('../models/categorias-model');

const CategoriasService = {
  async listarProdutosPorCategoria(categoria) {
    const produtosFiltrados = CategoriasModel.findByCategoria(categoria);
    return produtosFiltrados;
  },

  async listarCategorias() {
    const listaCategorias = CategoriasModel.findCategoriasUnicas();
    
    return listaCategorias.map((cat) => ({
      nome: cat,
      slug: cat.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')
    }));
  }
};

module.exports = CategoriasService;
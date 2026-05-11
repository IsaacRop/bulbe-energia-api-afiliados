const ProdutosModel = require('../models/produtos-model');

const ProdutosService = {
  async cadastrar(dados) {
    const { nome, preco, categoria, loja } = dados;

    if (!nome || preco === undefined || preco === null || !categoria || !loja) {
      const err = new Error('Os campos nome, preco, categoria e loja são obrigatórios.');
      err.status = 422;
      throw err;
    }

    return ProdutosModel.create(dados);
  },

  listarTodos() {
    return ProdutosModel.findAll();
  },

  buscarPorId(id) {
    const produto = ProdutosModel.findById(id);
    if (!produto) {
      const err = new Error('Produto não encontrado');
      err.status = 404;
      throw err;
    }
    return produto;
  },
};

module.exports = ProdutosService;

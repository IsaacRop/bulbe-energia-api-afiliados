const ProdutosModel = require('../models/produtos-model');

const ProdutosService = {
  async cadastrar(dados) {
    const { nome, preco, categoria, loja } = dados;

    // Validação de campos obrigatórios conforme RF-10 e status 422
    if (!nome || preco === undefined || preco === null || !categoria || !loja) {
      const err = new Error('Os campos nome, preco, categoria e loja são obrigatórios.');
      err.status = 422;
      throw err;
    }

    return ProdutosModel.create(dados);
  },
};

module.exports = ProdutosService;
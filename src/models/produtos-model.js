const produtosIniciais = require('../data/produtos.json');

const produtos = [...produtosIniciais];

const ProdutosModel = {
  create(dados) {
    const novoId = produtos.length > 0
      ? Math.max(...produtos.map((p) => p.id)) + 1
      : 1;

    const novo = {
      id: novoId,
      ...dados,
      criadoEm: new Date().toISOString(),
    };

    produtos.push(novo);
    return novo;
  },

  findAll() {
    return produtos;
  },

  findById(id) {
    return produtos.find((p) => p.id === Number(id));
  },

  updateById(id, dados) {
    const index = produtos.findIndex((p) => p.id === Number(id));

    if (index === -1) return null;

    produtos[index] = {
      ...produtos[index],
      ...dados,
      id: produtos[index].id,
    };

    return produtos[index];
  },
};

module.exports = ProdutosModel;

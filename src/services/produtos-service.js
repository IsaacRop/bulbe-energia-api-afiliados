const ProdutosModel = require('../models/produtos-model');

const ProdutosService = {
  async atualizar(id, dados) {
    if (!dados || Object.keys(dados).length === 0) {
      const err = new Error('Informe ao menos um campo para atualizar.');
      err.status = 422;
      throw err;
    }

    if (dados.nome !== undefined && dados.nome.trim() === '') {
      const err = new Error('O nome do produto não pode ser vazio.');
      err.status = 422;
      throw err;
    }

    if (dados.preco !== undefined && Number(dados.preco) <= 0) {
      const err = new Error('O preço do produto deve ser maior que zero.');
      err.status = 422;
      throw err;
    }

    const produto = ProdutosModel.updateById(id, dados);

    if (!produto) {
      const err = new Error('Produto não encontrado.');
      err.status = 404;
      throw err;
    }

    return produto;
  }


  
}

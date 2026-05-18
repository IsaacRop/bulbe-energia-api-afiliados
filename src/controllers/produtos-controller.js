const ProdutosModel = require('../models/produtos-model');

const ProdutosController = {
  cadastrar(req, res, next) {
    try {
      const novoProduto = ProdutosModel.create(req.body);
      return res.status(201).json({ data: novoProduto });
    } catch (err) {
      next(err);
    }
  },

  listar(req, res, next) {
    try {
      const produtos = ProdutosModel.findAll();
      return res.status(200).json({ data: produtos });
    } catch (err) {
      next(err);
    }
  },

  buscarPorId(req, res, next) {
    try {
      const produto = ProdutosModel.findById(req.params.id);

      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      return res.status(200).json({ data: produto });
    } catch (err) {
      next(err);
    }
  },

  atualizar(req, res, next) {
    try {
      const existe = ProdutosModel.findById(req.params.id);

      if (!existe) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      const produto = ProdutosModel.updateById(req.params.id, req.body);
      return res.status(200).json({ data: produto });
    } catch (err) {
      next(err);
    }
  },

  remover(req, res, next) {
    try {
      const removido = ProdutosModel.deleteById(req.params.id);

      if (!removido) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ProdutosController;
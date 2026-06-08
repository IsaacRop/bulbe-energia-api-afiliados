const ComentariosModel = require('../models/comentarios-model');
const ProdutosModel = require('../models/produtos-model');

function validarNota(nota) {
  if (nota === undefined || nota === null) return;

  const notaNum = Number(nota);
  if (!Number.isInteger(notaNum) || notaNum < 1 || notaNum > 5) {
    const err = new Error('A nota deve ser um número inteiro entre 1 e 5.');
    err.status = 422;
    throw err;
  }
}

const ComentariosService = {
  listarPorProduto(produtoId) {
    if (!produtoId) {
      const err = new Error('O parâmetro produtoId é obrigatório.');
      err.status = 422;
      throw err;
    }

    const produto = ProdutosModel.findById(produtoId);
    if (!produto) {
      const err = new Error('Produto não encontrado.');
      err.status = 404;
      throw err;
    }

    return ComentariosModel.findByProduto(produtoId);
  },

  async cadastrar(usuarioId, dados) {
    const { produtoId, conteudo, nota } = dados;

    if (!produtoId || !conteudo || conteudo.trim() === '') {
      const err = new Error('Os campos produtoId e conteudo são obrigatórios.');
      err.status = 422;
      throw err;
    }

    const produto = ProdutosModel.findById(produtoId);
    if (!produto) {
      const err = new Error('Produto não encontrado.');
      err.status = 404;
      throw err;
    }

    validarNota(nota);

    return ComentariosModel.create({ produtoId, usuarioId, conteudo, nota: nota ?? null });
  },

  async atualizar(id, usuarioId, dados) {
    const comentario = ComentariosModel.findById(id);
    if (!comentario) {
      const err = new Error('Comentário não encontrado.');
      err.status = 404;
      throw err;
    }

    if (comentario.usuarioId !== usuarioId) {
      const err = new Error('Você só pode editar os seus próprios comentários.');
      err.status = 403;
      throw err;
    }

    if (!dados || Object.keys(dados).length === 0) {
      const err = new Error('Informe ao menos um campo para atualizar.');
      err.status = 422;
      throw err;
    }

    if (dados.conteudo !== undefined && dados.conteudo.trim() === '') {
      const err = new Error('O conteúdo do comentário não pode ser vazio.');
      err.status = 422;
      throw err;
    }

    validarNota(dados.nota);

    const atualizado = ComentariosModel.updateById(id, dados);
    if (!atualizado) {
      const err = new Error('Nenhum campo reconhecido para atualizar.');
      err.status = 422;
      throw err;
    }

    return atualizado;
  },

  async remover(id, usuario) {
    const comentario = ComentariosModel.findById(id);
    if (!comentario) {
      const err = new Error('Comentário não encontrado.');
      err.status = 404;
      throw err;
    }

    const isDono = comentario.usuarioId === usuario.sub;
    const isAdmin = usuario.papel === 'admin';

    if (!isDono && !isAdmin) {
      const err = new Error('Você não tem permissão para remover este comentário.');
      err.status = 403;
      throw err;
    }

    return ComentariosModel.deleteById(id);
  },
};

module.exports = ComentariosService;

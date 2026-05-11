const produtos = require('../data/produtos.json');

const ProdutosModel = {
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

    deleteById(id) {
        const index = produtos.findIndex((p) => p.id === Number(id));

        if (index === -1) return null;

        const [removido] = produtos.splice(index, 1);

        return removido;
    },




};

module.exports = ProdutosModel;
function findAll() {
  return produtos;
}

function findByTerm(term) {
  const termo = term.toLowerCase();
  return produtos.filter((p) =>
    p.nome.toLowerCase().includes(termo) ||
    p.descricao.toLowerCase().includes(termo)
  );
}
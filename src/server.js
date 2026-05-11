const app = require('./app');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    mensagem: 'Bulbe Energia API está no ar!',
    versao: '1.0.0',
    documentacao: `http://localhost:${PORT}/api-docs`,
  });
});

app.listen(PORT, () => {
  console.log(`Bulbe Energia API rodando em http://localhost:${PORT}/api/v1`);
});

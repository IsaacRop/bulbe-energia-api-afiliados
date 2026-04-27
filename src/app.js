const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/api/v1', routes);

app.use((req, res) => {
  res.status(404).json({ error: 'Recurso não encontrado' });
});

app.use((err, req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Erro interno do servidor' });
});

module.exports = app;

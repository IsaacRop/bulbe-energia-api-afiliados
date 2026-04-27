const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Bulbe Energia API rodando em http://localhost:${PORT}/api/v1`);
});

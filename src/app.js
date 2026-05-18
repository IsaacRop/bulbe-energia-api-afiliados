const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { join } = require('node:path');


//ESPECIFICAÇÕES DO SWAGGER
const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Bulbe Energia API',
      version: '1.0.0',
      description:
        'API REST para gerenciamento de usinas de energia renovável do sistema ' +
        'Bulbe Energia. Permite listar, consultar e cadastrar usinas solares, ' +
        'eólicas, hidrelétricas e de biomassa.',
      contact: {
        name: 'Equipe Bulbe Energia',
        email: 'seuemail@alunos.ibmec.edu.br',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Servidor de desenvolvimento local',
      },
    ],
  },
  apis: [join(__dirname, 'routes', '*.js')],
};

const swaggerDocument = swaggerJsdoc(swaggerOptions);

const app = express();

//CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

//BODY PARSER
app.use(express.json());

//LOG DE REQUISIÇÕES
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

//Documentação — Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api-docs.json', (req, res) => {
  res.json(swaggerDocument);
});

//ROTAS
app.use('/api/v1', routes);

//ERRO 404
app.use((req, res) => {
  res.status(404).json({ error: 'Recurso não encontrado' });
});

//ERRO 500
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Erro interno do servidor' });
});

//EXPORTAR
module.exports = app;
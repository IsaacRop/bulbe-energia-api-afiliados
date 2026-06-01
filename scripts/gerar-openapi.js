// Gera docs/openapi.yaml a partir das anotações @openapi nas rotas.
// Mantém o arquivo estático sempre fiel ao código. Rode: node scripts/gerar-openapi.js
const fs = require('node:fs');
const { join } = require('node:path');
const swaggerJsdoc = require('swagger-jsdoc');
const YAML = require('yaml');

const ROOT = join(__dirname, '..');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Bulbe Afiliados API',
      version: '1.0.0',
      description:
        'API REST para gerenciamento do programa de afiliados da Bulbe Energia. ' +
        'Permite listar, consultar e cadastrar produtos, afiliados, favoritos e usuários.',
      contact: { name: 'Equipe Bulbe Energia', email: 'seuemail@alunos.ibmec.edu.br' },
    },
    servers: [
      { url: 'http://localhost:3000/api/v1', description: 'Servidor de desenvolvimento local' },
    ],
  },
  apis: [join(ROOT, 'src', 'routes', '*.js')],
};

const doc = swaggerJsdoc(options);
const yaml = YAML.stringify(doc);
const out = join(ROOT, 'docs', 'openapi.yaml');
fs.writeFileSync(out, yaml, 'utf8');
console.log(`openapi.yaml gerado com ${Object.keys(doc.paths || {}).length} paths em ${out}`);

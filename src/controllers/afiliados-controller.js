// src/controllers/afiliados-controller.js
 
const db = require('../db/conexão'); // instância better-sqlite3 exportada em conexão.js
 
// ─── GET /api/v1/afiliados ────────────────────────────────────────────────────
function listar(req, res, next) {
  try {
    const afiliados = db
      .prepare('SELECT id, nome, url FROM afiliados ORDER BY nome ASC')
      .all();
 
    return res.status(200).json(afiliados);
  } catch (err) {
    return next(err);
  }
}
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'bulbe-secret';

function authMiddleware(req, res, next) {
  const header = req.headers['authorization'];

  if (!header || !header.startsWith('Bearer ')) {
    const err = new Error('Token não fornecido.');
    err.status = 401;
    return next(err);
  }

  const token = header.split(' ')[1];

  try {
    req.usuario = jwt.verify(token, JWT_SECRET);
    req.usuarioId = req.usuario.sub;
    next();
  } catch (e) {
    const err = new Error('Token inválido.');
    err.status = 401;
    return next(err);
  }
}

module.exports = authMiddleware;

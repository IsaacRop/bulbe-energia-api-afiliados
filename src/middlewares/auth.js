const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const err = new Error('Não autorizado. Token JWT ausente.');
    err.status = 401;
    return next(err);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    const err = new Error('Não autorizado. Token JWT inválido ou expirado.');
    err.status = 401;
    next(err);
  }
}

module.exports = authMiddleware;

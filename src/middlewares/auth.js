function authMiddleware(req, res, next) {
  const usuarioId = req.headers['x-user-id'];

  if (!usuarioId) {
    const err = new Error('Não autorizado. Envie o header x-user-id.');
    err.status = 401;
    return next(err);
  }

  req.usuarioId = usuarioId;
  next();
}

module.exports = authMiddleware;
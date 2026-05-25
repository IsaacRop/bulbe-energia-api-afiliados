function adminMiddleware(req, res, next) {
  if (!req.user || req.user.papel !== 'admin') {
    const err = new Error('Acesso negado. Apenas administradores podem realizar esta ação.');
    err.status = 403;
    return next(err);
  }
  next();
}

module.exports = adminMiddleware;

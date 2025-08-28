const authMiddleware = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Acesso não autorizado. Faça login.' });
  }
  next();
};

module.exports = authMiddleware;
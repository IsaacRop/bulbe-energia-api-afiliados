const jwt = require('jsonwebtoken');
const usuarios = require('../data/usuarios');

const JWT_SECRET = process.env.JWT_SECRET || 'bulbe-secret';

function login(req, res, next) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    const usuario = usuarios.find((u) => u.email === email && u.senha === senha);

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { sub: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
}

module.exports = { login };

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Acceso no autorizado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agrega la información del usuario al request
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;
 
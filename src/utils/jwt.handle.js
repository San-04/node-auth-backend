import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

/**
 * Genera un token para el usuario
 */
const generateToken = (user) => {
  // Payload: los datos que viajan dentro del token (evita datos sensibles como passwords)
  const payload = {
    id: user.id,
    email: user.email,
  };

  // Firmar el token con una expiración (ej: 2 horas)
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

/**
 * Verifica si el token es válido (lo usaremos en el middleware)
 */
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export { generateToken, verifyToken };

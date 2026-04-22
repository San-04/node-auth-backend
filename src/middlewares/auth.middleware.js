const { verifyToken } = require("../utils/jwt.handle");

const checkJwt = (req, res, next) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop();

    const isUser = verifyToken(jwt);
    if (!isUser) {
      return res.status(401).json({ msg: "TOKEN_INVALIDO" });
    }

    req.user = isUser;
    next();
  } catch (e) {
    res.status(400).json({ msg: "SESION_NO_VALIDA" });
  }
};

module.exports = { checkJwt };

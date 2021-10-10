const usuarios = require("../controllers/usuarios");



class Middlewares {
async function middlewareToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).send({ msg: "unauthenticated user" });

    const validate = await usuarios.verificar(token);

    if (validate) {
      await next();
    } else {
      res.status(401).send({ msg: "invalid email or password" });
    }
  } catch (err) {
    res.status(500).send({ msg: err });
  }
}

module.exports = middlewareToken;

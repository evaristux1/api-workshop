const { usersServices } = require("../services");

class Middlewares {
  static async middlewareToken(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const IDdecoded = await jwt.verify(token, "Tijuca#2!");
      
      if (!token) return res.status(401).send({ msg: "unauthenticated user" });

      const validate = await usersServices.validateUserToken({ id: IDdecoded });

      if (validate) {
        await next();
      } else {
        res.status(401).send({ msg: "invalid email or password" });
      }
    } catch (err) {
      res.status(500).send({ msg: err });
    }
  }
}

module.exports = Middlewares;

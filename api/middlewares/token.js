const UnauthenticatedUser = require("../errors/UnauthenticatedUser");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET } = process.env;
class Middlewares {
  static async tokenValidade(req, res, next) {
    try {
      const token = req.headers.token;

      if (!token) throw new UnauthenticatedUser();
      const IDdecoded = jwt.verify(token, SECRET);

      req.idUserToken = IDdecoded.id;

      next();
    } catch (error) {
      return error.idError == 3
        ? res.status(403).json({ message: error.message })
        : res.status(401).json({ message: error.message });
    }
  }
}

module.exports = Middlewares;

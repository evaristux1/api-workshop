const UnauthenticatedUser = require("../errors/UnauthenticatedUser");
const UserWithoutPermission = require("../errors/UserWithoutPermission");
const jwt = require("jsonwebtoken");
const loginServices = require("../services/loginServices");

require("dotenv").config();
const { SECRET } = process.env;
class Middlewares {
  static async tokenValidade(req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new UnauthenticatedUser();
      } else {
        const IDdecoded = jwt.verify(token, SECRET);

        const validate = await loginServices.validateUserToken({
          id: IDdecoded.id,
        });

        if (req.params.id != null && req.params.id != IDdecoded.id) {
          throw new UserWithoutPermission();
        }
        if (validate) {
          await next();
        } else {
          throw new UnauthenticatedUser();
        }
      }
    } catch (error) {
      return error.idError == 3
        ? res.status(403).json({ message: error.message })
        : res.status(401).json({ message: error.message });
    }
  }
}

module.exports = Middlewares;

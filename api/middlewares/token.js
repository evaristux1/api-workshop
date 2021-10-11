const { usersServices } = require("../services");
const UnauthenticatedUser = require("../errors/UnauthenticatedUser");
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

        if (validate) {
          await next();
        } else {
          throw new UnauthenticatedUser();
        }
      }
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }
}

module.exports = Middlewares;

const Services = require("./services");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET } = process.env;
class LoginServices extends Services {
  constructor() {
    super("Users");
  }
  async signIn(req) {
    const { email, password } = req.body;

    const user = await this.findOneRecord({
      email: email,
      password: password,
    });

    if (!user) {
      throw new Error("invalid email or password");
    } else {
      return jwt.sign({ id: user.id }, SECRET, {
        expiresIn: "10h",
      });
    }
  }
  async validateUserToken(where) {
    const user = await this.findOneRecord(where);

    if (!user) {
      throw new Error("invalid email or password");
    } else {
      return user.id;
    }
  }
}

module.exports = new LoginServices();

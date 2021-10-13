const Services = require("./services");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const EmailOrPasswordInvalid = require('../errors/EmailOrPasswordInvalid');

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
    });
    if (!user || !bcrypt.compareSync(password, user.password))
      throw new EmailOrPasswordInvalid();

    return jwt.sign({ id: user.id }, SECRET, {});
  }
  async validateUserToken(where) {
    const user = await this.findOneRecord(where);

    if (!user) throw new EmailOrPasswordInvalid();
    return true;
  }
}

module.exports = new LoginServices();

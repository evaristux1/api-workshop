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
    console.log(
      "🚀 ~ file: loginServices.js ~ line 11 ~ LoginServices ~ signIn ~ req.params",
      req
    );

    const user = await this.findOneRecord({
      email: email,
      password: password,
    });

    if (!user.id) {
      //TODO: thow Error user not exists;
    } else {
      return jwt.sign({ id: user.îd }, SECRET, {
        expiresIn: "10h",
      });
    }
  }
}

module.exports = new LoginServices();

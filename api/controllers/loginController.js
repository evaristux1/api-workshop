const { loginServices } = require("../services");

class loginController {
  static async loginUser(req, res) {
    try {
      const token = await loginServices.signIn(req);
      return res.status(200).json({ token: token });
    } catch (error) {
      return res.status(400).json({ message: error.message, name: error.name });
    }
  }
}

module.exports = loginController;

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

  static async verifyToken(token) {
    const verify = await jwt.verify(token, "workshop#@!");

    const response = await loginServices.validateUserToken(verify);

    return response.length > 0;
  }
  catch(err) {
    return false;
  }
}

module.exports = loginController;

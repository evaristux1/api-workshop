const { loginServices } = require("../services");
const errorsController = require('./errorsController');

class loginController {
  static async loginUser(req, res) {
    try {
      const token = await loginServices.signIn(req);
      return res.status(200).json({ token: token });
    } catch (error) {
      const status = errorsController.getStatusToError(error);
      return res.status(status).json({message: error.message});
    }
  }
}
module.exports = loginController;

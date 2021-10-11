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

  static async createUser(req, res) {
    try {
      await usersServices.alreadyEmailRegistered(req);
      const userCreated = await usersServices.createARecord(req.body);
      return res.status(201).json({ userCreated: userCreated });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async updateAUser(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      //TODO mostrar o erro do email unique
      await usersServices.updateARecord(data, { id: Number(id) });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: error.message });
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

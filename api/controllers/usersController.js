const { usersServices } = require("../services");

class UsersController {
  static async getUser(req, res) {
    const { id } = req.params;
    try {
      //TODO user without permission, quando um usuario
      //tentar ver o perfil de outro
      const user = await usersServices.findOneRecord({ id: Number(id) });
      //TODO esse metodo não deve retornar o password
      return res.status(200).json(user);
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
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UsersController;

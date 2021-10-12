const UserWithoutPermission = require("../errors/UserWithoutPermission");
const { usersServices } = require("../services");

class UsersController {
  static async createUser(req, res) {
    try {
      await usersServices.alreadyEmailRegistered(req);
      const userCreated = await usersServices.createARecord(req.body);
      return res.status(201).json({ idUser: userCreated.id });
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }

  static async getUser(req, res) {
    try {
      if (req.idUserToken != req.params.id) throw new UserWithoutPermission();
      const user = await usersServices.getUserWithoutPassword(req);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async updateAUser(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      if (req.idUserToken != req.params.id) throw new UserWithoutPermission();
      await usersServices.alreadyEmailRegistered(req);
      await usersServices.updateARecord(data, { id: Number(id) });
      return res.status(204).end();
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }
}

module.exports = UsersController;

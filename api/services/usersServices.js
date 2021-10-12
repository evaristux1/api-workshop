const Services = require("./services");
const EmailRegistered = require("../errors/EmailRegistered");
class UsersServices extends Services {
  constructor() {
    super("Users");
  }

  async alreadyEmailRegistered(req) {
    const { email } = req.body;
    if (email) {
      const alreadyEmailRegistered = await this.findOneRecord({ email: email });
      if (alreadyEmailRegistered) {
        throw new EmailRegistered();
      }
    }
  }

  async getUserWithoutPassword(req){
    const { id } = req.params;
    const user = await this.findOneRecord({ id: Number(id) });
    delete user.password

    return user;
  }
}
module.exports = new UsersServices();

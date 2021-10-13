const Services = require("./services");
const EmailRegistered = require("../errors/EmailRegistered");
const UserWithoutPermission = require('../errors/UserWithoutPermission')
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

  async isUserAInstructor(req){
    if(!(await this.findOneRecord({type: 'instructor', id: req.idUserToken}))){
      throw new UserWithoutPermission();
    }
    
  }
}
module.exports = new UsersServices();

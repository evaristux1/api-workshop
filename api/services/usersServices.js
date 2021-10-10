const Services = require("./services");
const EmailRegistered = require('../errors/Emailregistered');
class UsersServices extends Services{
    constructor(){
        super('Users')
    }

    async alreadyEmailRegistered(req, res){
        const {email} = req.body;
        const alreadyEmailRegistered = await this.findOneRecord({where:{email: email}});
        if(alreadyEmailRegistered){
            throw new EmailRegistered()
        }
    }
}
module.exports = new UsersServices();
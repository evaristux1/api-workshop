const Services = require("./services");
const EmailRegistered = require('../errors/Emailregistered');
class UsersServices extends Services{
    constructor(){
        super('Users')
    }

    async alreadyEmailRegistered(req){
        const {email} = req.body;
        if(email){
            const alreadyEmailRegistered = await this.findOneRecord({email: email});
            if(alreadyEmailRegistered){
                throw new EmailRegistered()
            }
        }
    }
}
module.exports = new UsersServices();
const Services = require("./services");

class UsersServices extends Services{
    constructor(){
        super('Users')
    }
}

module.exports = new UsersServices();
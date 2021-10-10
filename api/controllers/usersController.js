const {usersServices} = require('../services')

class UsersController{

    static async createUser(req, res){
        try{
            const userCreated = await usersServices.createARecord(req.body);
            return res.status(201).json(userCreated);
        }catch(error){
            return res.status(400).json({message: error.message, name: error.name})
        }
    }

}

module.exports = UsersController;
const {usersServices} = require('../services')

class UsersController{

    static async getUser(req, res){
        const {id} = req.params;
        try{
            const user = await usersServices.findOneRecord({id: Number(id)});
            return res.status(200).json(user);
        }catch(error){
            return res.status(400).json({message: error.message, name: error.name})
        }
    }


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
const UserWithoutPermission = require('../errors/UserWithoutPermission');
const {interestsServices} = require('../services');
const { findOneRecord } = require('../services/usersServices');
class InterestsController{
    static async createAInterest(req, res){
        let data = req.body;
        data.userId = req.idUserToken;
        try{
            await interestsServices.alreadyInterestRegistered(req)
            await interestsServices.createARecord(data);
            return res.status(201).end()
        }catch(error){
            return res.status(400).json({message: error.message})
        }
    }

    static async deleteAInterest(req, res){
        try{
           const interestFound = await interestsServices.findInterest(req);
            if (req.idUserToken != interestFound.userId) throw new UserWithoutPermission();
            await interestsServices.deleteARecord({id: interestFound.id})
            return res.status(204).end()
        }catch(error){
            return res.status(403).json({message: error.message})
        }
    }
}

module.exports = InterestsController;
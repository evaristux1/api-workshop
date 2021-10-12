const {interestsServices} = require('../services')
class InterestsController{
    static async createAInterest(req, res){
        const data = req.body;
        try{
            await interestsServices.createARecord(data);
            return res.status(201).end()
        }catch(error){
            return res.status(400).json({message: error.message})
        }
    }
}

module.exports = InterestsController;
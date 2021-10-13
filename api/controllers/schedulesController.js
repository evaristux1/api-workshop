const DateLower = require('../errors/DateLower');
const UserWithoutPermission = require('../errors/UserWithoutPermission')
const errorsController = require('./errorsController');
const {schedulesServices} = require('../services');
const {usersServices} = require('../services');
class SchedulesController{

    static async schedulesTest(req, res) {
        try{
            await usersServices.isUseraInstructor(req);
            res.end();
        }catch(error){
            const status = errorsController.getStatusToError(error);
            return res.status(status).json({message: error.message});
        }
    }

    static async createSchedule(req, res){
        let data = req.body;
        data.userId = req.idUserToken;

        try{
            await schedulesServices.isDateLower(req);
            await schedulesServices.createARecord(data);
            res.end();


        }catch(error){
            const status = errorsController.getStatusToError(error);
            return res.status(status).json({message: error.message});
        }
    
    }

}

module.exports = SchedulesController;
const DateLower = require('../errors/DateLower');
const UserWithoutPermission = require('../errors/UserWithoutPermission')
const {schedulesServices} = require('../services');
const {usersServices} = require('../services');
class SchedulesController{

    static async schedulesTest(req, res) {
        try{
            await usersServices.isUseraInstructor(req);
            res.end();


        }catch(error){
            return res.status(403).json({ message: error.message });

        }
    }


}

module.exports = SchedulesController;
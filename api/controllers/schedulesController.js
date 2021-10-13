const UserWithoutPermission = require('../errors/UserWithoutPermission');
const errorsController = require('./errorsController');
const {schedulesServices} = require('../services');
const {usersServices} = require('../services');
class SchedulesController{

    static async createSchedule(req, res){
        let data = req.body;
        data.instructorId = req.idUserToken;
        console.log(data);
        try{
            //TODO falta criar um array de ids para themes
            await usersServices.isUseraInstructor(req);
            await schedulesServices.isDateLower(req);
            const {id} =  await schedulesServices.createARecord(data);
            res.status(200).json({idCreated: id});
        }catch(error){
            const status = errorsController.getStatusToError(error);
            return res.status(status).json({message: error.message});
        }
    
    }

    static async getAllSchedules(req, res){
        let data = req.body;
        data.instructorId = req.idUserToken;
        console.log(data.instructorId)

        try{
            const all = await schedulesServices.formatPagination(req)
            return res.status(200).json(all);
        }catch(error){
            const status = errorsController.getStatusToError(error);
            return res.status(status).json({message: error.message});
        }
    }

    static async updateASchedule(req, res){
        const { id } = req.params;
        try{
            await usersServices.isUseraInstructor(req);
            await schedulesServices.isDateLower(req);
            const data = await schedulesServices.filterSchedulesFields(req);
            const updated =  await schedulesServices.updateARecord(data, { id: Number(id) });
            const {instructorId} = await schedulesServices.findOneRecord({ id: Number(id) });
            if (req.idUserToken != instructorId) throw new UserWithoutPermission();
            return res.status(204).json(updated);
            
        }catch(error){
            const status = errorsController.getStatusToError(error);
            return res.status(status).json({message: error.message});

        }
    }

    static async updateASchedule(req, res){
        const { id } = req.params;
        try{
            await usersServices.isUseraInstructor(req);
            await schedulesServices.checkInstructorId(id, req)
            await schedulesServices.isDateLower(req);
            const data = await schedulesServices.filterSchedulesFields(req);
            await schedulesServices.updateARecord(data, { id: Number(id) });
            return res.status(204).end();

        }catch(error){
            const status = errorsController.getStatusToError(error);
            return res.status(status).json({message: error.message});

        }
    }


}

module.exports = SchedulesController;
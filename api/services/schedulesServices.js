const Services = require("./services");
const DateLower = require('../errors/DateLower');
const UserWithoutPermission = require('../errors/UserWithoutPermission')


class SchedulesServices extends Services{
    constructor() {
        super("Schedules");
      }

      async isDateLower(req){
        if(req.body.date){
          const scheduleDate = new Date(req.body.date);
          const today = new Date();
  
          if(scheduleDate < today ){
            throw new DateLower();
          }
        }
      }

      async filterSchedulesFields(req){
        const {date, title, description} = req.body;
        const filteredData = {date: date, title: title, description: description}
        return filteredData;


      }

      async checkInstructorId(id, req){
        const {instructorId} = await this.findOneRecord({ id: Number(id) });
        if (req.idUserToken != instructorId) throw new UserWithoutPermission();
      }



}

module.exports = new SchedulesServices();
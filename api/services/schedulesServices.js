const Services = require("./services");
const DateLower = require('../errors/DateLower');


class SchedulesServices extends Services{
    constructor() {
        super("Schedules");
      }

      async isDateLower(req){
        const scheduleDate = new Date(req.body.date);
        const today = new Date();
        
        if(scheduleDate < today ){
          throw new DateLower();
        }

      }



}

module.exports = new SchedulesServices();
const Services = require("./services");
const DateLower = require("../errors/DateLower");
const UserWithoutPermission = require("../errors/UserWithoutPermission");
const schedulesThemesServices = require("../services/schedulesThemesServices");
const themesServices = require('../services/themesServices')
const interestsServices = require('../services/interestsServices')
const userServices = require('../services/usersServices')

class SchedulesServices extends Services {
  constructor() {
    super("Schedules");
  }

  async isDateLower(req) {
    if (req.body.date) {
      const scheduleDate = new Date(req.body.date);
      const today = new Date();

      if (scheduleDate < today) {
        throw new DateLower();
      }
    }
  }

  async filterSchedulesFields(req) {
    const { date, title, description } = req.body;
    const filteredData = { date: date, title: title, description: description };
    return filteredData;
  }

  async checkInstructorId(id, req) {
    const { instructorId } = await this.findOneRecord({ id: Number(id) });
    if (req.idUserToken != instructorId) throw new UserWithoutPermission();
  }

  async formatPagination(req) {
    const {data, page, dataTotal} = await this.createPagination(req, {
      instructorId: req.idUserToken,
    });

    const themesFromSchedules = await this.getSchedulesThemes(data);
    let count = 0;
    const dataFormated = await Promise.all(data.map(async item => {
      const data = {
        id: item.id,
        themes: themesFromSchedules[count],
      };
      count ++;
      return data
    }));

    return {
      totalPages: page,
      totalItems: dataTotal, 
      data: dataFormated,
    };
  }

  async getSchedulesThemes(data){
    const schedulesThemes = await Promise.all(data.map(async item =>{
      const schedules = await schedulesThemesServices.getAllRecords({scheduleId: item.id});
      const themes = Promise.all(schedules.map(async item=>{
        const {id, title} = await themesServices.findOneRecord({id: item.themeId})
        const interested = await interestsServices.getAllRecords({themeId: id})
        const nameOfInterested = await Promise.all(interested.map(async item =>{
          const {name} = await userServices.findOneRecord({id: item.userId})
          return name;
        }))
        return {id: id, title: title, interesteds: nameOfInterested}
      }))
       return themes;
      }))  
      return schedulesThemes;
  }

}


module.exports = new SchedulesServices();

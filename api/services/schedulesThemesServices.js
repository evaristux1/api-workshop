const Services = require("./services");
const DateLower = require("../errors/DateLower");
const UserWithoutPermission = require("../errors/UserWithoutPermission");
const schedulesServices = require("./schedulesServices");

class SchedulesThemesServices extends Services {
  constructor() {
    super("Schedules_themes");
  }
  async createThemesSchedules(themes, scheduleId) {
    themes.map((id) => {
      this.createARecord({
        scheduleId: scheduleId,
        themeId: id,  
      });
    });
  }
  async deleteThemesSchedules(themeId, scheduleId) {
    return this.deleteARecord({
        themeId: themeId,
        scheduleId: scheduleId,
    });
  }

  async findSchedulesAndThemes(req) {
    const { id } = req.params;
    return this.getAllRecords({
      where: {
        themeId: id,
      },
    });
  }
}

module.exports = new SchedulesThemesServices();

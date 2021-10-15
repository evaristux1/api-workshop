const UserWithoutPermission = require("../errors/UserWithoutPermission");
const errorsController = require("./errorsController");
const { schedulesServices } = require("../services");
const { usersServices } = require("../services");
const themesServices = require("../services/themesServices");
const schedulesThemesServices = require("../services/schedulesThemesServices");
class SchedulesController {
  static async createSchedule(req, res) {
    try {
      let data = req.body;
      data.instructorId = req.idUserToken;
      const { themes } = req.body;

      await usersServices.isUseraInstructor(req);
      await schedulesServices.isDateLower(req);
      const { id } = await schedulesServices.createARecord(data);
      await schedulesThemesServices.createThemesSchedules(themes, id);
      res.status(200).json({ idCreated: id });
    } catch (error) {
      const status = errorsController.getStatusToError(error);
      return res.status(status).json({ message: error.message });
    }
  }

  static async getSchedulesOfInstructor(req, res) {
    let data = req.body;
    data.instructorId = req.idUserToken;
    try {
      await usersServices.isUseraInstructor(req);
      const all = await schedulesServices.formatPagination(req);
      return res.status(200).json(all);
    } catch (error) {
      console.error(error);
      const status = errorsController.getStatusToError(error);
      return res.status(status).json({ message: error.message });
    }
  }

  static async updateASchedule(req, res) {
    const { id } = req.params;
    try {
      await usersServices.isUseraInstructor(req);
      await schedulesServices.checkInstructorId(id, req);
      await schedulesServices.isDateLower(req);
      const data = await schedulesServices.filterSchedulesFields(req);
      await schedulesServices.updateARecord(data, { id: Number(id) });
      return res.status(204).end();
    } catch (error) {
      const status = errorsController.getStatusToError(error);
      return res.status(status).json({ message: error.message });
    }
  }
  static async createScheduleTheme(req, res) {
    try {
      await usersServices.isUseraInstructor(req);
      const { themeId } = req.body;
      const { id } = req.params;
      const idInstructor = req.idUserToken;

      await themesServices.themeAtInstructor(idInstructor, themeId);
      await schedulesThemesServices.createThemesSchedules([themeId], id);
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      const status = errorsController.getStatusToError(error);
      return res.status(status).json({ message: error.message });
    }
  }
  static async deleteScheduleTheme(req, res) {
    try {
      await usersServices.isUseraInstructor(req);
      const { id, themeId } = req.params;
      const idInstructor = req.idUserToken;

      await themesServices.themeAtInstructor(idInstructor, themeId);
      await schedulesThemesServices.deleteThemesSchedules(Number(themeId), Number(id));
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      const status = errorsController.getStatusToError(error);
      return res.status(status).json({ message: error.message });
    }
  }
}

module.exports = SchedulesController;

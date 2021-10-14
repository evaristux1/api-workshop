const database = require("../models");
const { themesServices, usersServices } = require("../services");
const errorsController = require("./errorsController");
const interestsServices = require("../services/interestsServices");
const { getInstructorName } = require("../services/schedulesServices");
const schedulesServices = require("../services/schedulesServices");

class ThemesController {
  static async createATheme(req, res) {
    let data = req.body;
    data.userId = req.idUserToken;
    try {
      await themesServices.alreadyThemeRegistered(req);
      const themeCreated = await themesServices.createARecord(data);
      return res.status(201).json({ idTheme: themeCreated.id });
    } catch (error) {
      const status = errorsController.getStatusToError(error);
      return res.status(status).json({ message: error.message });
    }
  }

  static async getAllThemes(req, res) {
    try {
      const allThemes = await themesServices.createPagination(req);
      res.status(200).json(allThemes);
    } catch (error) {
      const status = errorsController.getStatusToError(error);
      return res.status(status).json({ message: error.message });
    }
  }

  static async getThemeById(req, res) {
    try {
      const { id } = req.params;
      const theme = await themesServices.customQuery(
        `SELECT * FROM Themes AS t1 JOIN Users AS t2 ON t1.UserId = t2.id WHERE t1.id =${id}`
      );

      const userInterestsInTheme = await interestsServices.getAllRecords({
        themeId: id,
      });
      const allSchedulesByTheme = await schedulesServices.getAllRecords({
        themes: id,
      });

      let nameUserInterestsInTheme = [];

      userInterestsInTheme.map((item) => {
        nameUserInterestsInTheme.push(item["name"]);
      });
      const formatData = {
        id: theme[0].id,
        title: theme[0].title,
        description: theme[0].description,
        createdByName: theme[0].name,
        interesteds: nameUserInterestsInTheme,
        schedule: allSchedulesByTheme,
      };
      return res.status(200).json(formatData);
    } catch (error) {
      console.error(error);
    }
  }

  static async updateATheme(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      await themesServices.updateARecord(data, { id: Number(id) });
      return res.status(204).end();
    } catch (error) {
      const status = errorsController.getStatusToError(error);
      return res.status(status).json({ message: error.message });
    }
  }
}

module.exports = ThemesController;

const {
  themesServices,
  usersServices,
  interestsServices,
} = require("../services");
const errorsController = require("./errorsController");
const schedulesServices = require("../services/schedulesServices");
const { normalize } = require("path");
const schedulesThemesServices = require("../services/schedulesThemesServices");

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
      const allThemes = await themesServices.formatPagination(req);
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
      console.log(theme);
      const userInterestsInTheme = await interestsServices.getAllRecords({
        themeId: id,
      });
      const allSchedulesByTheme = await schedulesServices.getAllRecords({
        themes: id,
      });

      const idUserInterestsInTheme = userInterestsInTheme.map((item) => {
        return item["userId"];
      });

      const usersInterests = await Promise.all(
        idUserInterestsInTheme.map(async (item) => {
          return await usersServices.findOneRecord({ id: item });
        })
      );
      const nameUserInterests =
        usersInterests[0]!= null
          ? usersInterests.map((item) => {
              return item.name;
            })
          : [];
      const scheduleHaveTheme = await schedulesServices.customQuery(
        `SELECT t1.id,t3.name,t1.date FROM Schedules AS t1 
        JOIN Schedules_themes AS t2 ON t1.id = t2.scheduleId
        JOIN Users            AS t3 ON t1.instructorId = t3.id
        WHERE t2.themeId =${id}`
      );

      const allThemesofSchedule = scheduleHaveTheme.length
        ? await schedulesThemesServices.customQuery(
            `SELECT t2.id,t2.title FROM Schedules_themes AS t1 
        JOIN Themes AS t2 ON t1.themeId = t2.id
        WHERE t1.scheduleId =${scheduleHaveTheme[0].id}`
          )
        : [];

      var schedule = scheduleHaveTheme.length
        ? {
            instructor: scheduleHaveTheme[0].name,
            date: scheduleHaveTheme[0].date,
            themes: allThemesofSchedule.length ? allThemesofSchedule : [],
          }
        : {};
      const formatData = {
        id: theme[0].id,
        title: theme[0].title,
        description: theme[0].description,
        createdByName: theme[0].name,
        interesteds: nameUserInterests,
        schedule: schedule,
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

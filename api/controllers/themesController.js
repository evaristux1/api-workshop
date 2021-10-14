const database = require("../models");
const { themesServices, usersServices } = require("../services");
const interestsServices = require("../services/interestsServices");
const { getInstructorName } = require("../services/schedulesServices");
const schedulesServices = require("../services/schedulesServices");
const errorsController = require("./errorsController");

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
      const data = await themesServices.findInterestedtopic(req);
      //const interestedByName = await usersServices.getAllRecords({id:themeIdInterested.userId})
      console.log(data);

      // const formatData = {
      //     id: data.id,
      //     title: data.title,
      //     description: data.description,
      //     createdByName: name

      // }
      return res.status(200).json(data);
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

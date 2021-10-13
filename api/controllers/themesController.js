const {themesServices, usersServices} = require('../services')
const errorsController = require('./errorsController');
class ThemesController{

    static async createATheme(req, res){
        let data = req.body;
        data.userId = req.idUserToken;
        try{
            await themesServices.alreadyThemeRegistered(req);
            const themeCreated = await themesServices.createARecord(data)
            return res.status(201).json({idTheme: themeCreated.id})
        }catch(error){
            const status = errorsController.getStatusToError(error);
            return res.status(status).json({message: error.message});
        }
    }

    static async getAllThemes(req, res){
        try{
            const allThemes = await themesServices.createPagination(req);
            res.status(200).json(allThemes)
        }catch(error){
            const status = errorsController.getStatusToError(error);
            return res.status(status).json({message: error.message});
        }
    }

    static async getThemeById(req, res){
        try{
            const data = await themesServices.findOneRecord({id: req.params.id})
            return res.json(data)
        }catch(error){

        }
    }
}

module.exports = ThemesController;
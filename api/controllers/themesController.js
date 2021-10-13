const database = require ("../models")
const {themesServices, usersServices} = require('../services');
const interestsServices = require("../services/interestsServices");

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


    static async getThemeById(req, res) {
        try {
            const data = await themesServices.findOneRecord({id: req.params.id});
            const {name} = await usersServices.findOneRecord({id: data.userId});
            const themeIdInterested = await interestsServices.getAllRecords({themeId: req.params.id})
            //const interestedByName = await usersServices.getAllRecords({id:themeIdInterested.userId})
           console.log(themeIdInterested)

            const formatData = { 
                id: data.id,
                title: data.title,
                description: data.description,
                createdByName: name,
                
            }
        return res.status(200).json(formatData)
        } catch(error){
          console.error(error)
       }
      }
    

        
}

module.exports = ThemesController;
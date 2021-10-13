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
            return res.status(400).json({message: error.message})
        }
    }

    static async getAllThemes(req, res){
        try{
            let {page, pageSize} = req.query;
            if(!page || page <= 0) page = 1;
            if(!pageSize || pageSize > 15 || pageSize <= 0) pageSize = 5;
            
            //TODO paginação, falta criar a paginação.
            const allThemes = await themesServices.getAllRecords();
            res.status(200).json({
                totalPages: 1,
                totalItems: allThemes.length,
                data: allThemes
            })
        }catch(error){
            return res.status(400).json({message: error.message})
        }
    }


    static async getThemeById(req, res) {
        try {
            const data = await themesServices.findOneRecord({id: req.params.id});
            const {name} = await usersServices.findOneRecord({id: data.userId});
            const id = await interestsServices.getAllRecords({themeId: req.params.id})
            console.log(id.id)

            const formatData = { 
                id: data.id,
                title: data.title,
                description: data.description,
                createdByName: name,
                
            }

        return res.status(200).json(id)
        } catch(error){
          console.error(error)
       }
      }
    
    
}

module.exports = ThemesController;
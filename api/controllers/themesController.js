const {themesServices} = require('../services')

class ThemesController{

    static async createATheme(req, res){
        try{
            const data = req.body;
            await themesServices.alreadyThemeRegistered(req);
            // TODO: Ao cadastrar um tema o usuário autenticado deve ser automaticamente vinculado a este tema, 
            // Ou seja, userId deve ser o id do usuário logado.
            const themeCreated = await themesServices.createARecord(data)
            return res.status(201).json({idTheme: themeCreated.id})
        }catch(error){
            return res.status(400).json({message: error.message})
        }
    }

    static async getAllThemes(req, res){
        try{
            let {page, pageSize} = req.query;
            if(!page) page = 1;
            
            if(!pageSize) pageSize = 5;
            
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
}

module.exports = ThemesController;
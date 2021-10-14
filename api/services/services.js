const database = require("../models");
class Services {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async getAllRecords(where= {}, limit = null, offset = null) {
    return database[this.modelName].findAll({where: { ...where }, raw: true, limit: limit, offset: offset} );
  }
 
  async findOneRecord(where = {}, attribute) {
    return database[this.modelName].findOne({ where: { ...where }, raw: true});
  }
  async createARecord(data) {
    return database[this.modelName].create(data);
  }
   
  async updateARecord(data, where) {
    return database[this.modelName].update(data, { where: { ...where } });
  }
  
  async deleteARecord(where) {
    return await database[this.modelName].destroy({ where: { ...where } });
  }
  async customQuery(query) {
    return await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
  }
  async createPagination(req){
    const {pageSize = 5, page = 0} = req.query;
    let where;
    if(req.idUserToken){
      where = {userId: req.idUserToken};
    }else {
      where = {}
    }
    const data = await this.getAllRecords(where, Number(pageSize), Number(page));
    data.map(item =>{
      delete item.createdAt;
      delete item.updatedAt;
    })
    const formatToPagination = {
      totalPages: page,
      totalItems: data.length,
      data: data
    }
    return formatToPagination;
  }
 
}

module.exports = Services;

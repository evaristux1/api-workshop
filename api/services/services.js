const database = require("../models");
class Services {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async getAllRecords() {
    return database[this.modelName].findAll({raw: true});
  }
  // Estilo de where esperado findOneRecord({where: {id: id}})
  async findOneRecord(where = {}) {
    return database[this.modelName].findOne({ where: { ...where }, raw: true});
  }
  async createARecord(data) {
    return database[this.modelName].create(data);
  }
  // Estilo de where esperado updateARecord({where: {id: id}})
  async updateARecord(data, where) {
    return database[this.modelName].update(data, { where: { ...where } });
  }
  // Estilo de where esperado deleteRecord({where: {id: id}})
  async deleteARecord(where) {
    return await database[this.modelName].destroy({ where: { ...where } });
  }
 
}

module.exports = Services;

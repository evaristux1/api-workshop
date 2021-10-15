const database = require("../models");
const {sequelize} = require("../models");
const { QueryTypes } = require("sequelize");
class Services {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async getAllRecords(where = {}, limit = null, offset = null) {
    return database[this.modelName].findAll({
      where: { ...where },
      raw: true,
      limit: limit,
      offset: offset,
    });
  }

  async findOneRecord(where = {}) {
    return database[this.modelName].findOne({ where: { ...where }, raw: true });
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
  async createPagination(req, where ={}){
    let {page = 1, pageSize = 5} = req.query;
    if(page > 0){
      page -= 1
    }
    if(pageSize > 15) throw new Error('pageSize is greater than 15')
    const offSet = page * pageSize;
    const data = await this.getAllRecords(where, Number(pageSize), offSet);
    const dataTotal = await this.getAllRecords(where);
    let pageTotal = Math.round(dataTotal.length / pageSize)
    pageTotal += 1;

    return {data: data, page: pageTotal, dataTotal: dataTotal.length}
  }
}
module.exports = Services;

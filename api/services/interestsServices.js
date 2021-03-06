const Services = require("./services");
const InterestsRegistered = require('../errors/InterestsRegistered')
const NotFound = require('../errors/NotFound')
class InterestsServices extends Services {
  constructor() {
    super("Interests");
  }

  async alreadyInterestRegistered(req){
      const alreadyInterestRegistered = await this.findOneRecord({themeId: req.body.themeId, userId: req.body.userId})
      if(alreadyInterestRegistered) throw new InterestsRegistered();
  }

  async findInterest(req){
    const interestFound = await this.findOneRecord({id: req.params.id})
    if(!interestFound) throw new NotFound('interest')
    return interestFound;
  }

  async formatPagination(req){
    const {data, page, dataTotal} = await this.createPagination(req, {userId: req.idUserToken});

    const dataFormated = await data.map(item =>{
      return {
        id: item.id,
        userId: item.userId,
        theme: item.themeId
      }
    })

    return {
      totalPages: page,
      totalItems: dataTotal,
      data: dataFormated
    }
  } 
}
module.exports = new InterestsServices();
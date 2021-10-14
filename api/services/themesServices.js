const Services = require("./services");
const ThemeRegistered = require("../errors/ThemeRegistered");
class ThemesServices extends Services {
  constructor() {
    super("Themes");
  }

  async alreadyThemeRegistered(req) {
    const { title } = req.body;
    if (title) {
      const alreadyThemeRegistered = await this.findOneRecord({ title: title });
      if (alreadyThemeRegistered) {
        throw new ThemeRegistered();
      }
    }
  }

  async formatPagination(req){
    const {pageSize = 5} = req.query;
    const data = await this.createPagination(req, pageSize);
    const dataFormated = data.map(item =>{
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        userId: item.userId
      }
    })

    return {
      totalPages: 1,
      totalItems: dataFormated.length,
      data: dataFormated
    }
  } 

}
module.exports = new ThemesServices();

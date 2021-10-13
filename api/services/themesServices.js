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
    const {pageSize = 5, page = 0} = req.query;
    const data = await this.createPagination(req,{}, pageSize);

    return {
      totalPages: page,
      totalItems: data.length,
      data: data
    }
  } 

}
module.exports = new ThemesServices();

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
  async findInterestedtopic(req) {
    const { id } = req.params;
    if (id) {
      return await this.customQuery("SELECT * FROM users");
    }
  }
}
module.exports = new ThemesServices();

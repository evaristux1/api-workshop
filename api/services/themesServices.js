const Services = require("./services");
const ThemeRegistered = require("../errors/ThemeRegistered");
const UserWithoutPermission = require('../errors/UserWithoutPermission')
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

  async thisThemeExists(req) {
    const { id } = req.body;
    if (id) {
      const alreadyThemeRegistered = await this.findOneRecord({ id: id });
      if (alreadyThemeRegistered) {
        throw new ThemeRegistered();
      }
    }
  }
  async formatPagination(req) {
    const {data, page, dataTotal} = await this.createPagination(req);
    const dataFormated = data.map((item) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        userId: item.userId,
      };
    });

    return {
      totalPages: page,
      totalItems: dataTotal,
      data: dataFormated,
    };
  }
  static async themeAtInstructor(userId, themeId) {
    const themeIsInstructor = await this.findOneRecord({
      userId: userId,
      id: themeId,
    });
    if (!themeIsInstructor) {
      throw new UserWithoutPermission();
    }
  }
}

module.exports = new ThemesServices();

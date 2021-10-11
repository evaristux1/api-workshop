'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Themes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Themes.hasMany(models.Interests,{
        foreignKey:'themeId'
      })

      Themes.hasMany(models.Schedules_themes,{
        foreignKey:'themeId'
      })

      Themes.belongsTo(models.Users,{
        foreignKey:'userId'
      })
    }
  };
  Themes.init({
    title: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Themes',
    freezeTableName: true
  });
  return Themes;
};
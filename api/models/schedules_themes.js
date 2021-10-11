'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedules_themes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Schedules_themes.belongsTo(models.Schedules,{
        foreignKey:'scheduleId'
      })
      Schedules_themes.belongsTo(models.Themes,{
        foreignKey:'themeId'
      })
    }
  };
  Schedules_themes.init({
    scheduleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    themeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },{
    sequelize,
    modelName: 'Schedules_themes',
  });
  return Schedules_themes;
};
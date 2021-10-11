'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Schedules.hasMany(models.Schedules_themes,{
        foreignKey:'scheduleId'
      })

      Schedules.belongsTo(models.Users,{
        foreignKey:'instructorId'
      })
    }
  };
  Schedules.init({
    themes: DataTypes.INTEGER,
    instructorId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Schedules',
    freezeTableName: true
  });
  return Schedules;
};
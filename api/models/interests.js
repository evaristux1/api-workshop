'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Interests.belongsTo(models.Users,{
        foreignKey:'userId'
      })

      Interests.belongsTo(models.Themes,{
        foreignKey:'themeId'
      })
    }
  };
  Interests.init({
    themeId: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Interests',
    freezeTableName: true
  });
  return Interests;
};
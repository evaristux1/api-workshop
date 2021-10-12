'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Themes,{
        foreignKey:'userId'
      })
      Users.hasMany(models.Interests,{
        foreignKey:'userId'
      })
      Users.hasMany(models.Schedules,{
        foreignKey:'instructorId'
      })
    }
  };
  Users.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail:{
          args: true,
          msg: 'email is not valid'
        }
      }
    },
    password: {
      allowNull:false,
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM('student', 'instructor'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Users',
    freezeTableName: true
  });
  return Users;
};
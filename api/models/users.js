'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
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
    name: DataTypes.STRING,
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
    type: DataTypes.ENUM('student', 'instructor')
  },
  

  {
    sequelize,
    modelName: 'Users',
    freezeTableName: true,
    individualHooks: true,
  })


  Users.addHook('beforeCreate', async users =>{
    if(users.password){
      const salt = await bcrypt.genSaltSync(10, 'a');
      users.password = bcrypt.hashSync(users.password, salt);

    }
  }),

  Users.addHook('beforeBulkUpdate', async users =>{
    if(users.attributes.password){
      const salt = await bcrypt.genSaltSync(10, 'a');
      users.attributes.password = bcrypt.hashSync(users.attributes.password, salt);
    }
  })


  return Users;
}


  


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
  },

  {
    instanceMethods: {
      validPassword: (password) => {
        return bcrypt.compareSync(password, this.password);
       }

    }
  },
  )


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
  }),

  Users.addHook('afterFind', async users => {
    console.log(users);

    const account = await Model.Users.findOne();

  /*  if(users.where.password){
      console.log(users.where.password);
      const salt = await bcrypt.genSaltSync(10, 'a');
      users.where.password = bcrypt.hashSync(users.where.password, salt);
      const verified = bcrypt.compareSync(users.where.password, salt);

      console.log(verified, 'teste');
    }*/
    
  })


  Users.prototype.validPassword = async (password, hash) =>{
    return await bcrypt.compareSync(password, hash)
  }


  return Users;
}


  


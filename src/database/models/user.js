'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    email_verified: {type:DataTypes.BOOLEAN,defaultValue:false},
    password: DataTypes.STRING,
    apikey_id: DataTypes.INTEGER,
    is_Admin: {type:DataTypes.BOOLEAN,defaultValue:false}
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
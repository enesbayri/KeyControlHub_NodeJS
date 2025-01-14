'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class apikey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  apikey.init({
    userid: DataTypes.INTEGER,
    apikey: DataTypes.STRING,
    api_credit_balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'apikey',
  });
  return apikey;
};
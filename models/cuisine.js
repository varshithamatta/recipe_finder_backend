'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cuisine.init({
    cuisine_name: DataTypes.STRING,
    cuisine_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cuisine',
  });
  return Cuisine;
};
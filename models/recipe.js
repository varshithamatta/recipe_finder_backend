'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recipe.init({
    recipe_name: DataTypes.STRING,
    recipe_image: DataTypes.STRING,
    chef_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    cuisine_id: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    time: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};
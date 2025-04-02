const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: "mysql",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require("./user")(sequelize, DataTypes);
db.Chef = require("./chef")(sequelize, DataTypes);
db.Recipe = require("./recipe")(sequelize, DataTypes);
db.Ingredient = require("./ingredient")(sequelize, DataTypes);
db.Instruction = require("./instruction")(sequelize, DataTypes);
db.Category = require("./category")(sequelize, DataTypes);
db.Cuisine = require("./cuisine")(sequelize, DataTypes);
db.Like = require("./like")(sequelize, DataTypes);
db.SavedRecipe = require("./savedrecipe")(sequelize, DataTypes);
db.Follower = require("./follower")(sequelize, DataTypes);

// Associations
db.Chef.hasMany(db.Recipe, { foreignKey: "chef_id" });
db.Recipe.belongsTo(db.Chef, { foreignKey: "chef_id" });

db.Category.hasMany(db.Recipe, { foreignKey: "category_id" });
db.Recipe.belongsTo(db.Category, { foreignKey: "category_id" });

db.Cuisine.hasMany(db.Recipe, { foreignKey: "cuisine_id" });
db.Recipe.belongsTo(db.Cuisine, { foreignKey: "cuisine_id" });

db.Recipe.hasMany(db.Ingredient, { foreignKey: "recipe_id" });
db.Ingredient.belongsTo(db.Recipe, { foreignKey: "recipe_id" });

db.Recipe.hasMany(db.Instruction, { foreignKey: "recipe_id" });
db.Instruction.belongsTo(db.Recipe, { foreignKey: "recipe_id" });

db.User.belongsToMany(db.Recipe, { through: db.Like, foreignKey: "user_id" });
db.Recipe.belongsToMany(db.User, { through: db.Like, foreignKey: "recipe_id" });

db.User.belongsToMany(db.Recipe, { through: db.SavedRecipe, foreignKey: "user_id" });
db.Recipe.belongsToMany(db.User, { through: db.SavedRecipe, foreignKey: "recipe_id" });

db.User.belongsToMany(db.Chef, { through: db.Follower, foreignKey: "user_id" });
db.Chef.belongsToMany(db.User, { through: db.Follower, foreignKey: "chef_id" });

// Sync models with database
db.sequelize.sync({ alter: true });

module.exports = db;

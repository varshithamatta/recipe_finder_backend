const db = require("../models");

// Save a recipe
const saveRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user.id;

    // Check if already saved
    const existingSave = await SavedRecipe.findOne({ where: { user_id: userId, recipe_id: recipeId } });
    if (existingSave) {
      return res.status(400).json({ message: "Recipe already saved" });
    }

    await SavedRecipe.create({ user_id: userId, recipe_id: recipeId });
    res.json({ message: "Recipe saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Unsave a recipe
const unsaveRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user.id;

    const deleted = await SavedRecipe.destroy({ where: { user_id: userId, recipe_id: recipeId } });
    if (!deleted) return res.status(404).json({ message: "Saved recipe not found" });

    res.json({ message: "Recipe unsaved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all saved recipes by user
const getUserSavedRecipes = async (req, res) => {
  try {
    const userId = req.user.id;
    const savedRecipes = await SavedRecipe.findAll({ where: { user_id: userId } });

    res.json({ savedRecipes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { saveRecipe, unsaveRecipe, getUserSavedRecipes };

const db = require("../models");

// Like a recipe
const likeRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user.id;

    // Check if already liked
    const existingLike = await Like.findOne({ where: { user_id: userId, recipe_id: recipeId } });
    if (existingLike) {
      return res.status(400).json({ message: "Recipe already liked" });
    }

    await Like.create({ user_id: userId, recipe_id: recipeId });
    res.json({ message: "Recipe liked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Unlike a recipe
const unlikeRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user.id;

    const deleted = await Like.destroy({ where: { user_id: userId, recipe_id: recipeId } });
    if (!deleted) return res.status(404).json({ message: "Like not found" });

    res.json({ message: "Recipe unliked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all liked recipes by user
const getUserLikedRecipes = async (req, res) => {
  try {
    const userId = req.user.id;
    const likedRecipes = await Like.findAll({ where: { user_id: userId } });

    res.json({ likedRecipes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { likeRecipe, unlikeRecipe, getUserLikedRecipes };

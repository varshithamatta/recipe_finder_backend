const db = require("../models");

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await db.Recipe.findAll({ include: [db.Chef, db.Category, db.Cuisine] });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single recipe by ID
const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await db.Recipe.findByPk(id, { include: [db.Chef, db.Category, db.Cuisine] });
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new recipe
const createRecipe = async (req, res) => {
  const { recipe_name, recipe_image, category_id, cuisine_id, rating, time, description } = req.body;
  try {
    const newRecipe = await db.Recipe.create({
      recipe_name,
      recipe_image,
      chef_id: req.chef.chef_id,
      category_id,
      cuisine_id,
      rating,
      time,
      description,
    });
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a recipe
const updateRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await db.Recipe.findByPk(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.chef_id !== req.chef.chefId) {
      return res.status(403).json({ error: "Unauthorized to update this recipe" });
    }

    await recipe.update(req.body);
    res.json({ message: "Recipe updated successfully", recipe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await db.Recipe.findByPk(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

     // Ensure the logged-in chef is the owner
     if (recipe.chef_id !== req.chef.chef_id) {
      return res.status(403).json({ error: "Unauthorized to delete this recipe" });
    }

    await recipe.destroy();
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadRecipeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.json({ message: "Recipe image uploaded successfully", recipe_image: `/uploads/${req.file.filename}` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe, uploadRecipeImage };

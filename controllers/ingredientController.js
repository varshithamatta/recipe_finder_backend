const db = require("../models");

// Get all ingredients
const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await db.Ingredient.findAll({ include: db.Recipe });
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single ingredient by ID
const getIngredientById = async (req, res) => {
  const { id } = req.params;
  try {
    const ingredient = await db.Ingredient.findByPk(id, { include: db.Recipe });
    if (!ingredient) return res.status(404).json({ message: "Ingredient not found" });
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new ingredient
const createIngredient = async (req, res) => {
  const { recipe_id, name, quantity, notes } = req.body;
  try {
    const newIngredient = await db.Ingredient.create({ recipe_id, name, quantity, notes });
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an ingredient
const updateIngredient = async (req, res) => {
  const { id } = req.params;
  try {
    const ingredient = await db.Ingredient.findByPk(id);
    if (!ingredient) return res.status(404).json({ message: "Ingredient not found" });

    await ingredient.update(req.body);
    res.json({ message: "Ingredient updated successfully", ingredient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an ingredient
const deleteIngredient = async (req, res) => {
  const { id } = req.params;
  try {
    const ingredient = await db.Ingredient.findByPk(id);
    if (!ingredient) return res.status(404).json({ message: "Ingredient not found" });

    await ingredient.destroy();
    res.json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllIngredients, getIngredientById, createIngredient, updateIngredient, deleteIngredient };

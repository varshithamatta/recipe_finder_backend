const db = require("../models");

// Get all cuisines
const getAllCuisines = async (req, res) => {
  try {
    const cuisines = await db.Cuisine.findAll({ include: db.Recipe });
    res.json(cuisines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single cuisine by ID
const getCuisineById = async (req, res) => {
  const { id } = req.params;
  try {
    const cuisine = await db.Cuisine.findByPk(id, { include: db.Recipe });
    if (!cuisine) return res.status(404).json({ message: "Cuisine not found" });
    res.json(cuisine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new cuisine
const createCuisine = async (req, res) => {
  const { cuisine_name, cuisine_image } = req.body;
  try {
    const newCuisine = await db.Cuisine.create({ cuisine_name, cuisine_image });
    res.status(201).json(newCuisine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a cuisine
const updateCuisine = async (req, res) => {
  const { id } = req.params;
  try {
    const cuisine = await db.Cuisine.findByPk(id);
    if (!cuisine) return res.status(404).json({ message: "Cuisine not found" });

    await cuisine.update(req.body);
    res.json({ message: "Cuisine updated successfully", cuisine });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a cuisine
const deleteCuisine = async (req, res) => {
  const { id } = req.params;
  try {
    const cuisine = await db.Cuisine.findByPk(id);
    if (!cuisine) return res.status(404).json({ message: "Cuisine not found" });

    await cuisine.destroy();
    res.json({ message: "Cuisine deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get recipes by cuisine ID
const getRecipesByCuisineId = async (req, res) => {
  const { id } = req.params;
  try {
    const cuisine = await db.Cuisine.findByPk(id);
    if (!cuisine) return res.status(404).json({ message: "Cuisine not found" });

    const recipes = await db.Recipe.findAll({
      where: { cuisine_id: id },
    });

    res.json({ cuisine_name: cuisine.cuisine_name, recipes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { getAllCuisines, getCuisineById, createCuisine, updateCuisine, deleteCuisine, getRecipesByCuisineId };

const db = require("../models");

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await db.Category.findAll({ include: db.Recipe });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await db.Category.findByPk(id, { include: db.Recipe });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await db.Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await db.Category.findByPk(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    await category.update(req.body);
    res.json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await db.Category.findByPk(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    await category.destroy();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };

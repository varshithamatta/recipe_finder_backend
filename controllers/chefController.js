const db = require("../models");

// Get all chefs
const getAllChefs = async (req, res) => {
  try {
    const chefs = await db.Chef.findAll({ include: db.Recipe });
    res.json(chefs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single chef by ID
const getChefById = async (req, res) => {
  const { id } = req.params;
  try {
    const chef = await db.Chef.findByPk(id, { include: db.Recipe });
    if (!chef) return res.status(404).json({ message: "Chef not found" });
    res.json(chef);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new chef
const createChef = async (req, res) => {
  const { name, image_url, bio } = req.body;
  try {
    const newChef = await db.Chef.create({ name, image_url, bio, followers: 0 });
    res.status(201).json(newChef);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a chef
const updateChef = async (req, res) => {
  const { id } = req.params;
  try {
    const chef = await db.Chef.findByPk(id);
    if (!chef) return res.status(404).json({ message: "Chef not found" });

    await chef.update(req.body);
    res.json({ message: "Chef updated successfully", chef });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a chef
const deleteChef = async (req, res) => {
  const { id } = req.params;
  try {
    const chef = await db.Chef.findByPk(id);
    if (!chef) return res.status(404).json({ message: "Chef not found" });

    await chef.destroy();
    res.json({ message: "Chef deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllChefs, getChefById, createChef, updateChef, deleteChef };

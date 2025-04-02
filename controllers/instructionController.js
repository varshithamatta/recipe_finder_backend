const db = require("../models");

// Get all instructions
const getAllInstructions = async (req, res) => {
  try {
    const instructions = await db.Instruction.findAll({ include: db.Recipe });
    res.json(instructions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single instruction by ID
const getInstructionById = async (req, res) => {
  const { id } = req.params;
  try {
    const instruction = await db.Instruction.findByPk(id, { include: db.Recipe });
    if (!instruction) return res.status(404).json({ message: "Instruction not found" });
    res.json(instruction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new instruction
const createInstruction = async (req, res) => {
  const { recipe_id, step_number, title, description, image_url } = req.body;
  try {
    const newInstruction = await db.Instruction.create({
      recipe_id,
      step_number,
      title,
      description,
      image_url,
    });
    res.status(201).json(newInstruction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an instruction
const updateInstruction = async (req, res) => {
  const { id } = req.params;
  try {
    const instruction = await db.Instruction.findByPk(id);
    if (!instruction) return res.status(404).json({ message: "Instruction not found" });

    await instruction.update(req.body);
    res.json({ message: "Instruction updated successfully", instruction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an instruction
const deleteInstruction = async (req, res) => {
  const { id } = req.params;
  try {
    const instruction = await db.Instruction.findByPk(id);
    if (!instruction) return res.status(404).json({ message: "Instruction not found" });

    await instruction.destroy();
    res.json({ message: "Instruction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllInstructions, getInstructionById, createInstruction, updateInstruction, deleteInstruction };

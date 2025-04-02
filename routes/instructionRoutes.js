const express = require("express");
const router = express.Router();
const {
  getAllInstructions,
  getInstructionById,
  createInstruction,
  updateInstruction,
  deleteInstruction,
} = require("../controllers/instructionController");
const { authenticateChef } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Instructions
 *   description: Recipe Instructions API
 */


// Instruction Routes
/**
 * @swagger
 * /api/instructions:
 *   get:
 *     summary: Get all instructions
 *     tags: [Instructions]
 *     responses:
 *       200:
 *         description: Successfully retrieved all instructions
 */
router.get("/", getAllInstructions);

/**
 * @swagger
 * /api/instructions/{recipeId}:
 *   get:
 *     summary: Get instructions of a recipe
 *     tags: [Instructions]
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: List of instructions
 */
router.get("/:id", getInstructionById);

/**
 * @swagger
 * /api/instructions:
 *   post:
 *     summary: Add an instruction (Chefs only)
 *     tags: [Instructions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipe_id:
 *                 type: integer
 *               step_number:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Instruction added
 */
router.post("/",authenticateChef, createInstruction);

/**
 * @swagger
 * /api/instructions/{id}:
 *   put:
 *     summary: Update an instruction (Chefs only)
 *     tags: [Instructions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Instruction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               step_number:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Instruction updated
 */
router.put("/:id",authenticateChef, updateInstruction);

/**
 * @swagger
 * /api/instructions/{id}:
 *   delete:
 *     summary: Delete an instruction (Only for Chefs)
 *     tags: [Instructions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Instruction deleted successfully
 */
router.delete("/:id",authenticateChef, deleteInstruction);

module.exports = router;

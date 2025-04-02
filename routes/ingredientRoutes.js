const express = require("express");
const router = express.Router();
const {
  getAllIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} = require("../controllers/ingredientController");
const { authenticateChef } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: Recipe Ingredients API
 */

// Ingredient Routes
/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: List of ingredients
 */
router.get("/", getAllIngredients);

/**
 * @swagger
 * /api/ingredients/{recipeId}:
 *   get:
 *     summary: Get ingredients of a recipe
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: List of ingredients
 *       404:
 *         description: Recipe not found
 */
router.get("/:id", getIngredientById);

/**
 * @swagger
 * /api/ingredients:
 *   post:
 *     summary: Add an ingredient (Chefs only)
 *     tags: [Ingredients]
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
 *               name:
 *                 type: string
 *               quantity:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ingredient added
 *       403:
 *         description: Unauthorized (Only chefs can add)
 */
router.post("/",authenticateChef, createIngredient);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   put:
 *     summary: Update an ingredient (Chefs only)
 *     tags: [Ingredients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ingredient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ingredient updated
 */
router.put("/:id",authenticateChef, updateIngredient);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   delete:
 *     summary: Delete an ingredient (Chefs only)
 *     tags: [Ingredients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ingredient ID
 *     responses:
 *       200:
 *         description: Ingredient deleted
 */
router.delete("/:id",authenticateChef, deleteIngredient);

module.exports = router;

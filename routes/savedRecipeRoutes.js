const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");
const {
  saveRecipe,
  unsaveRecipe,
  getUserSavedRecipes,
} = require("../controllers/savedRecipeController");

/**
 * @swagger
 * tags:
 *   name: Saved Recipes
 *   description: Users can save and unsave recipes
 */


// Save a recipe
/**
 * @swagger
 * /api/saved-recipes/{recipeId}:
 *   post:
 *     summary: Save a recipe
 *     tags: [Saved Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Successfully saved the recipe
 *       400:
 *         description: Recipe already saved
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipe not found
 */
router.post("/:recipeId", authenticateUser, saveRecipe);

// Unsave a recipe
/**
 * @swagger
 * /api/saved-recipes/{recipeId}:
 *   delete:
 *     summary: Unsave a recipe
 *     tags: [Saved Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully unsaved the recipe
 *       400:
 *         description: Recipe not saved yet
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipe not found
 */
router.delete("/:recipeId", authenticateUser, unsaveRecipe);

// Get all saved recipes by user
/**
 * @swagger
 * /api/saved-recipes:
 *   get:
 *     summary: Get all recipes saved by the authenticated user
 *     tags: [Saved Recipes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of saved recipes
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateUser, getUserSavedRecipes);

module.exports = router;

const express = require("express");
const { authenticateUser } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  likeRecipe,
  unlikeRecipe,
  getUserLikedRecipes,
} = require("../controllers/likeController");

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: User likes and unlikes recipes
 */


// Like a recipe
/**
 * @swagger
 * /api/likes/{recipeId}:
 *   post:
 *     summary: Like a recipe
 *     tags: [Likes]
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
 *         description: Successfully liked the recipe
 *       400:
 *         description: Recipe already liked
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipe not found
 */
router.post("/:recipeId", authenticateUser, likeRecipe);

// Unlike a recipe
/**
 * @swagger
 * /api/likes/{recipeId}:
 *   delete:
 *     summary: Unlike a recipe
 *     tags: [Likes]
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
 *         description: Successfully unliked the recipe
 *       400:
 *         description: Recipe not liked yet
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipe not found
 */
router.delete("/:recipeId", authenticateUser, unlikeRecipe);

// Get all liked recipes by user
/**
 * @swagger
 * /api/likes:
 *   get:
 *     summary: Get all recipes liked by the authenticated user
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of liked recipes
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateUser, getUserLikedRecipes);


module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");
const upload = require("../middleware/uploadMiddleware");
const {uploadRecipeImage} = require("../controllers/recipeController")
const {authenticateUser, authenticateChef} = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe API endpoints
 */


// Recipe Routes
/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: List of recipes
 */
router.get("/", getAllRecipes);

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Get a single recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe details
 *       404:
 *         description: Recipe not found
 */
router.get("/:id", getRecipeById);

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     summary: Create a new recipe (Chefs only)
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipe_name:
 *                 type: string
 *               recipe_image:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               cuisine_id:
 *                 type: integer
 *               time:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       403:
 *         description: Unauthorized (Only chefs can create)
 */
router.post("/",authenticateChef, createRecipe);

/**
 * @swagger
 * /api/recipes/{id}:
 *   put:
 *     summary: Update a recipe (Chefs only)
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Recipe ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipe_name:
 *                 type: string
 *               recipe_image:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               cuisine_id:
 *                 type: integer
 *               time:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *       403:
 *         description: Unauthorized (Only chefs can update)
 */
router.put("/:id",authenticateChef, updateRecipe);

/**
 * @swagger
 * /api/recipes/{id}:
 *   delete:
 *     summary: Delete a recipe (Chefs only)
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       403:
 *         description: Unauthorized (Only chefs can delete)
 */
router.delete("/:id",authenticateChef, deleteRecipe);

/**
 * @swagger
 * /api/recipes/upload:
 *   post:
 *     summary: Upload recipe image
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: recipe_image
 *         type: file
 *         required: true
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
router.post("/upload", authenticateChef, upload.single("recipe_image"), uploadRecipeImage);

module.exports = router;

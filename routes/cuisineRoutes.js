const express = require("express");
const { authenticateChef } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  getAllCuisines,
  getCuisineById,
  createCuisine,
  updateCuisine,
  deleteCuisine,
  getRecipesByCuisineId
} = require("../controllers/cuisineController");

/**
 * @swagger
 * tags:
 *   name: Cuisines
 *   description: Cuisine management (Only Chefs can create, update, and delete)
 */

// Cuisine Routes
/**
 * @swagger
 * /api/cuisines:
 *   get:
 *     summary: Get all cuisines
 *     tags: [Cuisines]
 *     responses:
 *       200:
 *         description: Successfully retrieved all cuisines
 */
router.get("/", getAllCuisines);

/**
 * @swagger
 * /api/cuisines/{id}:
 *   get:
 *     summary: Get a cuisine by ID
 *     tags: [Cuisines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved cuisine
 *       404:
 *         description: Cuisine not found
 */
router.get("/:id", getCuisineById);

router.get("/recipe/:id", getRecipesByCuisineId);

/**
 * @swagger
 * /api/cuisines:
 *   post:
 *     summary: Create a new cuisine (Only for Chefs)
 *     tags: [Cuisines]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cuisine_name:
 *                 type: string
 *               cuisine_image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cuisine created successfully
 *       403:
 *         description: Only chefs can create cuisines
 */
router.post("/",authenticateChef, createCuisine);

/**
 * @swagger
 * /api/cuisines/{id}:
 *   put:
 *     summary: Update a cuisine (Only for Chefs)
 *     tags: [Cuisines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cuisine_name:
 *                 type: string
 *               cuisine_image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cuisine updated successfully
 *       403:
 *         description: Only chefs can update cuisines
 *       404:
 *         description: Cuisine not found
 */
router.put("/:id",authenticateChef, updateCuisine);

/**
 * @swagger
 * /api/cuisines/{id}:
 *   delete:
 *     summary: Delete a cuisine (Only for Chefs)
 *     tags: [Cuisines]
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
 *         description: Cuisine deleted successfully
 *       403:
 *         description: Only chefs can delete cuisines
 *       404:
 *         description: Cuisine not found
 */
router.delete("/:id",authenticateChef, deleteCuisine);

module.exports = router;

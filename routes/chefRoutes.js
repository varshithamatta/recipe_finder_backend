const express = require("express");
const router = express.Router();
const {
  getAllChefs,
  getChefById,
  createChef,
  updateChef,
  deleteChef,
} = require("../controllers/chefController");
const {authenticateChef} = require("../middleware/authMiddleware");

// Chef Routes

/**
 * @swagger
 * tags:
 *   name: Chefs
 *   description: Chef management routes
 */

/**
 * @swagger
 * /api/chefs:
 *   get:
 *     summary: Get all chefs
 *     tags: [Chefs]
 *     responses:
 *       200:
 *         description: Successfully retrieved all chefs
 */
router.get("/", getAllChefs);

/**
 * @swagger
 * /api/chefs/{id}:
 *   get:
 *     summary: Get a chef by ID
 *     tags: [Chefs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved chef
 *       404:
 *         description: Chef not found
 */
router.get("/:id", getChefById);



/**
 * @swagger
 * /api/chefs/{id}:
 *   put:
 *     summary: Update a chef
 *     tags: [Chefs]
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
 *               name:
 *                 type: string
 *               image_url:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Chef updated successfully
 *       404:
 *         description: Chef not found
 */
router.put("/:id", updateChef);

/**
 * @swagger
 * /api/chefs/{id}:
 *   delete:
 *     summary: Delete a chef
 *     tags: [Chefs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chef deleted successfully
 *       404:
 *         description: Chef not found
 */
router.delete("/:id", deleteChef);

/**
 * @swagger
 * /api/chefs/profile:
 *   get:
 *     summary: Get chef profile
 *     tags: [Chefs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns chef profile data
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", authenticateChef, async (req, res) => {
  try {
    const chef = await Chef.findByPk(req.chef.chefId, {
      attributes: ["id", "name", "image_url", "followers", "bio"],
    });
    if (!chef) return res.status(404).json({ error: "Chef not found" });

    res.json(chef);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

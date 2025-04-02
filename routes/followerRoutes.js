const express = require("express");
const { authenticateUser } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  followChef,
  unfollowChef,
  getUserFollowedChefs,
} = require("../controllers/followerController");

/**
 * @swagger
 * tags:
 *   name: Followers
 *   description: User follows and unfollows chefs
 */

// Follow a chef
/**
 * @swagger
 * /api/followers/{chefId}:
 *   post:
 *     summary: Follow a chef
 *     tags: [Followers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chefId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Successfully followed the chef
 *       400:
 *         description: Already following the chef
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chef not found
 */
router.post("/:chefId", authenticateUser, followChef);

// Unfollow a chef
/**
 * @swagger
 * /api/followers/{chefId}:
 *   delete:
 *     summary: Unfollow a chef
 *     tags: [Followers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chefId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully unfollowed the chef
 *       400:
 *         description: Not following the chef
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chef not found
 */
router.delete("/:chefId", authenticateUser, unfollowChef);

// Get all followed chefs by user
/**
 * @swagger
 * /api/followers:
 *   get:
 *     summary: Get all chefs followed by the authenticated user
 *     tags: [Followers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of followed chefs
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateUser, getUserFollowedChefs);


module.exports = router;

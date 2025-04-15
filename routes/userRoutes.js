const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { getUsers, getUserById, updateUser, deleteUser, uploadUserProfile } = require("../controllers/userController");
const db = require("../models");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

// User Routes
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get("/", getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get("/:id", getUserById);



/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user details
 *     tags: [Users]
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
 *               email:
 *                 type: string
 *                 example: "updated@example.com"
 *               profile_image:
 *                 type: string
 *                 example: "http://example.com/image.jpg"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put("/:id", updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
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
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:id", deleteUser);

/**
 * @swagger
 * /api/users/upload:
 *   post:
 *     summary: Upload user profile image
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: profile_image
 *         type: file
 *         required: true
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
router.post("/upload", authenticateUser, upload.single("profile_image"), uploadUserProfile);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user profile data
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", authenticateUser, async (req, res) => {
    try {
      const user = await db.User.findByPk(req.user.userId, {
        attributes: ["id","name", "email", "profile_image"],
      });
      if (!user) return res.status(404).json({ error: "User not found" });
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

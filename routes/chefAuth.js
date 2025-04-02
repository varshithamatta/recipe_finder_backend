const express = require("express");
const router = express.Router();
const { Chef } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * tags:
 *   name: Chef Authentication
 *   description: Chef authentication APIs
 */

/**
 * @swagger
 * /api/auth/chef/register:
 *   post:
 *     summary: Register a new chef
 *     tags: [Chef Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Gordon Ramsay"
 *               email:
 *                 type: string
 *                 example: "chef@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Chef registered successfully
 *       400:
 *         description: Email already exists
 */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingChef = await Chef.findOne({ where: { email } });
    if (existingChef) return res.status(400).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newChef = await Chef.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Chef registered successfully", chefId: newChef.id });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Registration failed", details: error.message });
  }
});


/**
 * @swagger
 * /api/auth/chef/login:
 *   post:
 *     summary: Chef login
 *     tags: [Chef Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "chef@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const chef = await Chef.findOne({ where: { email } });
    if (!chef) return res.status(401).json({ error: "Invalid credentials" });

    const isValidPassword = await bcrypt.compare(password, chef.password);
    if (!isValidPassword) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ chefId: chef.id, role: "chef" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Login failed", details: error.message });
  }
});


module.exports = router;

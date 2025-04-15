const db = require("../models");

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const getUserById = async (req, res) => {
  try {
    console.log("User ID received:", req.params.id);

    const user = await db.User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      console.log("User not found with ID:", req.params.id);
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};


const updateUser = async (req, res) => {
    const { email, profile_image } = req.body;
  
    try {
      const user = await db.User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      user.email = email || user.email;
      user.profile_image = profile_image || user.profile_image;
      await user.save();
  
      res.json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Update failed" });
    }
};

const deleteUser = async (req, res) => {
    try {
      const user = await db.User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      await user.destroy();
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Delete failed" });
    }
  };

  const uploadUserProfile = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      const user = await db.User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.profile_image = `/uploads/${req.file.filename}`;
      await user.save();
  
      res.json({ message: "Profile image uploaded successfully", profile_image: user.profile_image });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  

module.exports = { getUsers, getUserById, updateUser, deleteUser, uploadUserProfile };

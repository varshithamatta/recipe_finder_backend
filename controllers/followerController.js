const { Follower, Chef } = require("../models");

// Follow a chef
const followChef = async (req, res) => {
  try {
    const { chefId } = req.params;
    const userId = req.user.id;

    // Check if already following
    const existingFollow = await Follower.findOne({ where: { user_id: userId, chef_id: chefId } });
    if (existingFollow) {
      return res.status(400).json({ message: "Already following this chef" });
    }

    await Follower.create({ user_id: userId, chef_id: chefId });

    // Update chef's follower count
    await Chef.increment("followers", { where: { id: chefId } });

    res.json({ message: "Chef followed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Unfollow a chef
const unfollowChef = async (req, res) => {
  try {
    const { chefId } = req.params;
    const userId = req.user.id;

    const deleted = await Follower.destroy({ where: { user_id: userId, chef_id: chefId } });
    if (!deleted) return res.status(404).json({ message: "Not following this chef" });

    // Decrease chef's follower count
    await Chef.decrement("followers", { where: { id: chefId } });

    res.json({ message: "Chef unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all followed chefs by user
const getUserFollowedChefs = async (req, res) => {
  try {
    const userId = req.user.id;
    const followedChefs = await Follower.findAll({ where: { user_id: userId } });

    res.json({ followedChefs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { followChef, unfollowChef, getUserFollowedChefs };

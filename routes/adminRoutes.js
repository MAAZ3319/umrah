import express from "express";
import User from "../models/User.js";
import { protect, adminProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Get all users in an organization (Admin only)
router.get("/users", protect, adminProtect, async (req, res) => {
  try {
    console.log("Admin Organization ID:", req.user.organizationId);
    const users = await User.find({ organizationId: req.user.organizationId }).select("-password");
    console.log("Users found:", users);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// 🔹 Delete a user (Admin only, cannot delete themselves)
router.delete("/user/:id", protect, adminProtect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.id === req.user.id) {
      return res.status(400).json({ message: "Admins cannot delete themselves" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Update user role (Admin only)
router.put("/user/:id/role", protect, adminProtect, async (req, res) => {
  try {
    const { role } = req.body;
    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

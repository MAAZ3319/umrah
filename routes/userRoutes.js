import express from "express";
import User from "../models/User.js";
import Organization from "../models/Organization.js";
// import bcrypt from "bcryptjs";

const router = express.Router();

// ✅ Add User to Organization
router.post("/add-user", async (req, res) => {
  try {
    const { name, email, password, orgEmail } = req.body;

    if (!name || !email || !password || !orgEmail) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find Organization by orgEmail
    const organization = await Organization.findOne({ orgEmail });

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    // Check if user already exists within the same organization
    const existingUser = await User.findOne({ email, organizationId: organization._id });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create and Save User (Schema will handle password hashing)
    const newUser = new User({
      name,
      email,
      password,
      organizationId: organization._id,
    });

    await newUser.save();

    res.status(201).json({
      message: "User added successfully!",
      user: newUser,
    });
  } catch (error) {
    console.error("❌ Error Adding User:", error);
    res.status(500).json({ message: "Server error, try again later" });
  }
});



// ✅ Get Users by Organization Email
router.get("/users/:orgEmail", async (req, res) => {
  try {
    const { orgEmail } = req.params;
    const organization = await Organization.findOne({ orgEmail });

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const users = await User.find({ organizationId: organization._id }).select("name email _id");
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error Fetching Users:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;

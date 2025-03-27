// import express from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";
// import Organization from "../models/Organization.js";

// const router = express.Router();

// // 🔒 Register New User
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, orgEmail, role } = req.body;
//     if (!name || !email || !password || !orgEmail) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if organization exists
//     const organization = await Organization.findOne({ orgEmail });
//     if (!organization) {
//       return res.status(404).json({ message: "Organization not found" });
//     }

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user, default role is "user" if not provided
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       organizationId: organization._id,
//       role: role || "user",
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (error) {
//     console.error("❌ Error in Registration:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });
 

// // 🔐 User Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     // Check user existence
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Find the organization linked to the user
//     const organization = await Organization.findById(user.organizationId);
//     if (!organization) {
//       return res.status(404).json({ message: "Organization not found" });
//     }

//     // Validate password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

//     // Send user data along with the token
//     const userData = {
//       id: user._id,
//       name: user.name,
//       orgEmail: organization.orgEmail,
//     };

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: userData,
//     });
//   } catch (error) {
//     console.error("❌ Error in Login:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;


// import express from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";
// import Organization from "../models/Organization.js";

// const router = express.Router();

// // 🔒 Register New User
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, orgEmail, role } = req.body;
//     if (!name || !email || !password || !orgEmail) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if organization exists
//     const organization = await Organization.findOne({ orgEmail });
//     if (!organization) {
//       return res.status(404).json({ message: "Organization not found" });
//     }

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user, default role is "user" if not provided
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       organizationId: organization._id,
//       role: role || "user",
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (error) {
//     console.error("❌ Error in Registration:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // 🔐 User Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password, orgEmail } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     // Check user existence
//     const user = await User.findOne({ email,orgEmail });
//     if (!user) {
//       return res.status(401).json({ message: "user not found or organisation mismatch" });
//     }

//     // Find the organization linked to the user
//     const organization = await Organization.findById(user.organizationId);
//     if (!organization) {
//       return res.status(404).json({ message: "Organization not found" });
//     }

//     // (Optional) If orgEmail is provided, verify it matches the organization's email
//     if (orgEmail && orgEmail !== organization.orgEmail) {
//       return res.status(401).json({ message: "Invalid organization credentials" });
//     }

//     // Validate password
//     const isMatch = await bcrypt.compare(password, user.password);
// if (!isMatch) {
//   return res.status(401).json({ message: "Invalid password" });
// }
// user.password = await bcrypt.hash("newpassword", 10);
// await user.save();


//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

//     // Send user data along with the token
//     const userData = {
//       id: user._id,
//       name: user.name,
//       orgEmail: organization.orgEmail,
//     };

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: userData,
//     });
//   } catch (error) {
//     console.error("❌ Error in Login:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;




import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Organization from "../models/Organization.js";

const router = express.Router();

// 🔒 Register New User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, orgEmail, role } = req.body;
    if (!name || !email || !password || !orgEmail) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if organization exists
    const organization = await Organization.findOne({ orgEmail });
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email, organizationId: organization._id });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user (no manual password hashing needed)
    const newUser = new User({
      name,
      email,
      password, // Schema will handle hashing
      organizationId: organization._id,
      role: role || "user",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("❌ Error in Registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔐 User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password, orgEmail } = req.body;
    if (!email || !password || !orgEmail) {
      return res.status(400).json({ message: "Email, password, and orgEmail are required" });
    }

    // Check user existence within the specified organization
    const user = await User.findOne({ email }).populate("organizationId");

    if (!user || user.organizationId.orgEmail !== orgEmail) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role , organizationId: user.organizationId}, // Include role in token
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    

    // Send user data along with the token
    const userData = {
      id: user._id,
      name: user.name,
      orgEmail: user.organizationId.orgEmail,
      role:user.role
    };

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("❌ Error in Login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

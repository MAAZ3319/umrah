// // // routes/organizationRoutes.js
// // import express from "express";
// // import { createOrganization, addUserToOrganization, getUsers } from "../controllers/organizationController.js";

// // const router = express.Router();

// // // Create Organization
// // router.post("/create", createOrganization);

// // // Add User to Organization
// // router.post("/addUser", addUserToOrganization);

// // // Get Organization Users
// // router.get("/:orgId/users", getUsers);

// // export default router;



// import express from "express";
// import Organization from "../models/Organization.js";
// import User from "../models/User.js";
// import { sendWelcomeEmail, notifyAdmin } from "../utils/email.js";

// const router = express.Router();

// // Add User to Organization
// router.post("/addUser", async (req, res) => {
//   try {
//     const { orgId, name, email, mobile, password } = req.body;

//     // Check if organization exists
//     let organization = await Organization.findOne({ orgId });
//     if (!organization) {
//       organization = await Organization.create({ orgId });
//     }

//     // Limit to 10 members
//     if (organization.members.length >= 10) {
//       return res.status(400).json({ message: "❌ Organization is full (10 members max)." });
//     }

//     // Create User
//     const newUser = await User.create({ orgId: organization._id, name, email, mobile, password });

//     // Add user to organization
//     organization.members.push(newUser._id);
//     await organization.save();

//     // Send Welcome Email
//     await sendWelcomeEmail(email, name);
//     await notifyAdmin(orgId, name, email);

//     res.status(201).json({ message: "✅ User added successfully!", user: newUser });
//   } catch (error) {
//     console.error("❌ Error adding user:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Get Organization Users
// router.get("/users/:orgId", async (req, res) => {
//   try {
//     const { orgId } = req.params;
//     const organization = await Organization.findOne({ orgId }).populate("members");
//     if (!organization) return res.status(404).json({ message: "❌ Organization not found" });
//     res.status(200).json(organization.members);
//   } catch (error) {
//     console.error("❌ Error fetching users:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;


// ---new project---



// import express from "express";
// import Organization from "../models/Organization.js";
// import User from "../models/User.js";

// const router = express.Router();



// // POST: Create an organization
// router.post("/organization", (req, res) => {
//   console.log("✅ Organization created:", req.body);
//   res.status(201).json({ message: "Organization created successfully!" });
// });


// // Create an Organization
// router.post("/create-organization", async (req, res) => {
//   const { name, email, password, secretKey } = req.body;

//   if (secretKey !== process.env.SECRET_KEY) {
//     return res.status(403).json({ message: "Invalid secret key" });
//   }

//   try {
//     const org = new Organization({ name, email, password, secretKey });
//     await org.save();
//     res.status(201).json({ message: "Organization created successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error creating organization", error: err });
//   }
// });

// // Add Users to Organization
// router.post("/add-user", async (req, res) => {
//   const { name, email, password, organizationId } = req.body;

//   try {
//     const user = new User({ name, email, password, organizationId });
//     await user.save();
//     res.status(201).json({ message: "User added successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error adding user", error: err });
//   }
// });

// // User Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email, password });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     res.status(200).json({ message: "Login successful", user });
//   } catch (err) {
//     res.status(500).json({ message: "Error logging in", error: err });
//   }
// });

// export default router;





// routes/organizationRoutes.js
// import express from "express";

// const router = express.Router();

// // ✅ Test Route: Create Organization
// router.post("/organization", (req, res) => {
//   console.log("✅ Request Body:", req.body);
//   res.status(201).json({ message: "Organization created successfully!" });
// });

// // ✅ Health Check (Optional)
// router.get("/test", (req, res) => {
//   res.json({ message: "API working fine!" });
// });

// export default router;




// import express from "express";
// import Organization from "../models/Organization.js";

// const router = express.Router();

// // ✅ Create Organization and Save to MongoDB
// router.post("/organization", async (req, res) => {
//   try {
//     const { orgEmail, orgPhone, secretKey } = req.body;

//     // Validate Input
//     if (!orgEmail || !orgPhone || !secretKey) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Save to MongoDB
//     const newOrg = new Organization({ orgEmail, orgPhone, secretKey });
//     await newOrg.save();

//     console.log("✅ Organization Saved:", newOrg);
//     res.status(201).json({ message: "Organization created successfully!" });
//   } catch (error) {
//     console.error("❌ Error Saving Organization:", error);
//     res.status(500).json({ message: "Server error, try again later" });
//   }
// });

// // ✅ Health Check Route
// router.get("/test", (req, res) => {
//   res.json({ message: "API working fine!" });
// });

// export default router;

// routes/organizationRoutes.js
import express from "express";
import Organization from "../models/Organization.js";

const router = express.Router();

// ✅ Create Organization with Fixed Locations
router.post("/organization", async (req, res) => {
  try {
    const { orgEmail, orgPhone, secretKey, orgLat, orgLng, fixedLocations } = req.body;

    // Validate required fields
    if (!orgEmail || !orgPhone || !secretKey || !orgLat || !orgLng) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Validate fixedLocations (optional but should be properly formatted if provided)
    if (fixedLocations) {
      if (!Array.isArray(fixedLocations)) {
        return res.status(400).json({ message: "fixedLocations must be an array." });
      }

      const isValidLocation = (loc) =>
        loc.name && typeof loc.name === "string" &&
        typeof loc.latitude === "number" &&
        typeof loc.longitude === "number";

      if (!fixedLocations.every(isValidLocation)) {
        return res.status(400).json({
          message: "Each fixed location must include a valid name, latitude, and longitude.",
        });
      }
    }

    // Create and save the organization
    const newOrg = new Organization({
      orgEmail,
      orgPhone,
      secretKey,
      orgLat,
      orgLng,
      fixedLocations: fixedLocations || [],
    });

    await newOrg.save();
    res.status(201).json({
      message: "✅ Organization created successfully!",
      organization: newOrg,
    });
  } catch (error) {
    console.error("❌ Error Creating Organization:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Fetch Organization Details
router.get("/organization/:orgEmail", async (req, res) => {
  try {
    const { orgEmail } = req.params;
    const organization = await Organization.findOne({ orgEmail });

    if (!organization) {
      return res.status(404).json({ message: "Organization not found." });
    }

    res.status(200).json(organization);
  } catch (error) {
    console.error("❌ Error Fetching Organization:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;

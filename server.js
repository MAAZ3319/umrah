// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import organizationRoutes from "./routes/organizationRoutes.js";


// dotenv.config();

// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: process.env.FRONTEND_URL,
//   },
// });

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/api", organizationRoutes);


// app.get("/", (_req, res) => {
//   res.send("🚀 Backend is running successfully!");
// });


// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log(process.env.MONGO_URI))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // Socket.io for real-time location tracking
// io.on("connection", (socket) => {
//   console.log("🟢 User connected:", socket.id);

//   socket.on("updateLocation", (data) => {
//     console.log("📍 Location Update:", data);
//     io.emit("locationUpdate", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔴 User disconnected");
//   });
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// httpServer.listen(PORT, () =>
//   console.log(`🚀 Server running on port ${PORT}`)
// );




// // backend/server.js
// // import express from "express";
// // import dotenv from "dotenv";

// // dotenv.config();
// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // // Middleware
// // app.use(express.json());

// // // Routes
// // app.post("/api/organization/addUser", (req, res) => {
// //   console.log("User Data:", req.body);
// //   res.status(200).json({ message: "User added successfully" });
// // });

// // // Start the server
// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });



// -----new project---------------



// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import organizationRoutes from "./routes/organizationRoutes.js";

// dotenv.config();

// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: process.env.FRONTEND_URL,
//   },
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api", organizationRoutes);
  



// // Default Route
// app.get("/", (req, res) => {
//   res.send("🚀 Backend is running successfully!");
// });

// // MongoDB Connection
// mongoose
// .connect(process.env.MONGO_URI)
// .then(() => console.log(process.env.MONGO_URI))
// .catch((err) => console.error("❌ MongoDB Error:", err));

// // Real-time location tracking
// io.on("connection", (socket) => {
//   console.log("🟢 User connected:", socket.id);
  
//   socket.on("updateLocation", (data) => {
//     console.log("📍 Location Update:", data);
//     io.emit("locationUpdate", data);
//   });
  
//   socket.on("disconnect", () => {
//     console.log("🔴 User disconnected");
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// const router = express.Router();

// // Test Route
// router.post("/organization", (req, res) => {
//   console.log("✅ Organization created:", req.body);
//   res.status(201).json({ message: "Organization created successfully!" });
//   alert("🛠️ Routes loaded");
// });

// export default router;






// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import organizationRoutes from "./routes/organizationRoutes.js";

// dotenv.config();

// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: process.env.FRONTEND_URL || "*",
//   },
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // ✅ Confirm Route Setup
// console.log("✅ Routes are being loaded");

// // Routes
// app.use("/api", organizationRoutes);

// // Default Route
// app.get("/", (req, res) => {
//   res.send("🚀 Backend is running successfully!");
// });

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected", process.env.MONGO_URI))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // Real-time location tracking
// io.on("connection", (socket) => {
//   console.log("🟢 User connected:", socket.id);
//   socket.on("disconnect", () => console.log("🔴 User disconnected"));
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import organizationRoutes from "./routes/organizationRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import { connectDB } from "./config/db.js";
// import { handleLocationTracking } from "./socket/locationTracking.js";






// dotenv.config();
// connectDB();

// const app = express();
// const httpServer = createServer(app);

// const io = new Server(httpServer, {
//   cors: {
//     origin: process.env.FRONTEND_URL || "*",
//   },
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // ✅ Confirm Route Setup
// console.log("✅ Routes are being loaded");

// // Routes
// app.use("/api", organizationRoutes);
// app.use("/api/users", userRoutes); // ✅ Add user routes here
// app.use("/api/auth", authRoutes);


// // Default Route
// app.get("/", (req, res) => {
//   res.send("🚀 Backend is running successfully!");
// });

// handleLocationTracking(io);
// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected", process.env.MONGO_URI))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // Real-time location tracking
// io.on("connection", (socket) => {
//   console.log("🟢 User connected:", socket.id);
//   socket.on("disconnect", () => console.log("🔴 User disconnected"));
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));






// // Real-time location tracking
// const userLocations = new Map(); // Store user locations

// io.on("connection", (socket) => {
//   console.log("🟢 User connected:", socket.id);

//   // Update and store user's location
//   socket.on("updateLocation", ({ latitude, longitude, userId }) => {
//     userLocations.set(userId, { latitude, longitude });
//     socket.broadcast.emit("locationUpdate", { userId, latitude, longitude });
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log("🔴 User disconnected");
//     userLocations.forEach((value, key) => {
//       if (value.socketId === socket.id) userLocations.delete(key);
//     });
//   });
// });



// // server.js
// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import organizationRoutes from "./routes/organizationRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import { connectDB } from "./config/db.js";
// import { handleLocationTracking } from "./socket/locationTracking.js";

// dotenv.config();
// connectDB();

// const app = express();
// const httpServer = createServer(app);

// // Initialize Socket.io

// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:3000", // Change this if needed
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });



// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// console.log("✅ Routes are being loaded");
// app.use("/api", organizationRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);

// // Default route
// app.get("/", (req, res) => {
//   res.send("🚀 Backend is running successfully!");
// });

// // Handle location tracking
// handleLocationTracking(io);

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // Start the server
// const PORT = process.env.PORT || 5000;
// httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));





// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import organizationRoutes from "./routes/organizationRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js"; // 🔹 New Admin Routes
// import { connectDB } from "./config/db.js";
// import { handleLocationTracking } from "./socket/locationTracking.js";

// dotenv.config();
// connectDB();

// const app = express();
// const httpServer = createServer(app);

// // Initialize Socket.io
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:3000", // Change this if needed
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// console.log("✅ Routes are being loaded");
// app.use("/api", organizationRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes); // 🔹 Registered Admin Routes

// // Default route
// app.get("/", (req, res) => {
//   res.send("🚀 Backend is running successfully!");
// });

// // Handle location tracking
// handleLocationTracking(io);

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // Start the server
// const PORT = process.env.PORT || 5000;
// httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import organizationRoutes from "./routes/organizationRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js"; // 🔹 New Admin Routes
// import { connectDB } from "./config/db.js";
// import { handleLocationTracking } from "./socket/locationTracking.js";

// dotenv.config();
// connectDB();

// const app = express();
// const httpServer = createServer(app);

// // Allowed origins for CORS
// const allowedOrigins = [
//    "https://umrah-connect.web.app", // Production frontend
//   "http://localhost:3000" // Local development
// ];

// // Initialize Socket.io
// const io = new Server(httpServer, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });

// // Middleware
// app.use(cors({
//   origin: allowedOrigins,
//   methods: ["GET", "POST"],
//   credentials: true
// }));
// app.use(express.json());

// // Routes
// console.log("✅ Routes are being loaded");
// app.use("/api", organizationRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes); // 🔹 Registered Admin Routes

// // Default route
// app.get("/", (req, res) => {
//   res.send("🚀 Backend is running successfully!");
// });

// // Health check route
// app.get("/health", (req, res) => {
//   res.status(200).send("Server is healthy!");
// });

// // Handle location tracking
// handleLocationTracking(io);

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // Start the server
// const PORT = process.env.PORT || 5000;
// httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import organizationRoutes from "./routes/organizationRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js"; // 🔹 New Admin Routes
// import { connectDB } from "./config/db.js";
// import { handleLocationTracking } from "./socket/locationTracking.js";

// dotenv.config();
// connectDB();

// const app = express();
// const httpServer = createServer(app);

// // Allowed origins for CORS
// const allowedOrigins = [
//   "https://umrah-connect.web.app", // Production frontend
//   "http://localhost:3000" // Local development
// ];

// // Initialize Socket.io
// const io = new Server(httpServer, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // Middleware
// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );
// app.use(express.json());

// // Routes
// console.log("✅ Routes are being loaded");
// app.use("/api", organizationRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes); // 🔹 Registered Admin Routes

// // Default route
// app.get("/", (req, res) => {
//   res.send("🚀 Backend is running successfully!");
// });

// // Health check route
// app.get("/health", (req, res) => {
//   res.status(200).send("Server is healthy!");
// });

// // Handle location tracking
// handleLocationTracking(io);

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // Start the server
// const PORT = process.env.PORT || 5000;
// httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

//above worked 

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import organizationRoutes from "./routes/organizationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { connectDB } from "./config/db.js";
import { handleLocationTracking } from "./socket/locationTracking.js";

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

// Allowed origins
const allowedOrigins = [
  "https://umrah-connect.web.app", // Production frontend
  "http://localhost:3000" // Local development
];

// Initialize Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  },
});

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
console.log("✅ Routes are being loaded");
app.use("/api", organizationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// Handle location tracking
handleLocationTracking(io);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

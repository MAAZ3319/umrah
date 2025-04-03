// //middleware/authMiddleware to protect routes
// import jwt from "jsonwebtoken";


// export const protect = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
//     if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = decoded;
//     next(); // Continue to the protected route
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };



import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
    if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next(); // Continue to the protected route
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};


// 🔹 Admin Middleware (New)
export const adminProtect = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};

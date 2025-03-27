// import { getDistance } from "../utils/distance.js";
// import Organization from "../models/Organization.js";

// const userLocations = new Map(); // Store user locations

// export const handleLocationTracking = (io) => {
//   io.on("connection", (socket) => {
//     console.log("🟢 User connected:", socket.id);

//     // Update user's location
//     socket.on("updateLocation", async ({ latitude, longitude, userId, orgEmail }) => {
//       const organization = await Organization.findOne({ orgEmail });
//       if (!organization) return;

//       const { orgLat, orgLng } = organization;

//       // Calculate user distance from organization
//       const distance = getDistance(latitude, longitude, orgLat, orgLng);

//       // If user exceeds 500m, send alert
//       if (distance > 500) {
//         socket.emit("alert", {
//           message: "🚨 You are outside the safe area (500m limit)!",
//         });
//       }

//       // Store location and broadcast update
//       userLocations.set(userId, { latitude, longitude });
//       socket.broadcast.emit("locationUpdate", { userId, latitude, longitude });
//     });

//     // Handle disconnection
//     socket.on("disconnect", () => {
//       console.log("🔴 User disconnected");
//       userLocations.forEach((value, key) => {
//         if (value.socketId === socket.id) userLocations.delete(key);
//       });
//     });
//   });
// };


// // socket/locationTracking.js
// import { getDistance } from "../utils/distance.js";
// import Organization from "../models/Organization.js";

// // Store user locations
// const userLocations = new Map();

// export const handleLocationTracking = (io) => {
//   io.on("connection", (socket) => {
//     console.log("🟢 User connected:", socket.id);

//     // Handle location updates
//     socket.on("updateLocation", async ({ latitude, longitude, userId, orgEmail }) => {
//       try {
//         const organization = await Organization.findOne({ orgEmail });
//         if (!organization) {
//           console.error("❌ Organization not found");
//           return;
//         }

//         // Calculate distance
//         const { orgLat, orgLng } = organization;
//         const distance = getDistance(latitude, longitude, orgLat, orgLng);
//         console.log(`📊 Distance for ${userId}: ${distance} meters`);

//         // Send alert if user moves beyond 500m radius
//         if (distance > 500) {
//           socket.emit("alert", {
//             message: "🚨 You are outside the 500m safe area!",
//           });
//         }

//         // Store user location
//         userLocations.set(userId, { latitude, longitude });
//         socket.broadcast.emit("locationUpdate", { userId, latitude, longitude });
//       } catch (error) {
//         console.error("❌ Location Update Error:", error);
//       }
//     });

//     // Handle disconnection
//     socket.on("disconnect", () => {
//       console.log("🔴 User disconnected");
//       userLocations.forEach((value, key) => {
//         if (value.socketId === socket.id) userLocations.delete(key);
//       });
//     });
//   });
// };


// // new socket/locationTracking.js
import { getDistance } from "../utils/distance.js";
import Organization from "../models/Organization.js";

const userLocations = new Map();
const onlineUsers = new Map(); // Track online users

export const handleLocationTracking = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("updateLocation", async ({ latitude, longitude, userId, userName, orgEmail }) => {
      try {
        if (!orgEmail) {
          return console.error("❌ orgEmail is missing in updateLocation event");
        }

        const organization = await Organization.findOne({ orgEmail });
        if (!organization) {
          return console.error("❌ Organization not found");
        }

        // Check distance from organization center
        const { orgLat, orgLng, fixedLocations } = organization;
        const orgDistance = getDistance(latitude, longitude, orgLat, orgLng);

        let alerts = [];
        if (orgDistance > 500) {
          alerts.push("🚨 You are outside the 500m safe area!");
        }

        if (Array.isArray(fixedLocations)) {
          fixedLocations.forEach((loc) => {
            const locDistance = getDistance(latitude, longitude, loc.latitude, loc.longitude);
            if (locDistance <= 500) {
              alerts.push(`🗺️ You are near ${loc.name}`);
            }
          });
        }

        if (alerts.length > 0) {
          socket.emit("alert", { messages: alerts });
        }

        // Store user location
        userLocations.set(userId, { latitude, longitude });

        // Track online users
        onlineUsers.set(userId, { socketId: socket.id, latitude, longitude, userName, orgEmail });

        // Broadcast updates
        socket.broadcast.emit("locationUpdate", { userId, latitude, longitude });
        io.emit("onlineUsers", Array.from(onlineUsers.values())); // Send online users to all clients
      } catch (error) {
        console.error("❌ Location Update Error:", error);
        socket.emit("error", { message: "An error occurred while updating location." });
      }
    });

    socket.on("disconnect", async () => {
      for (const [userId, user] of onlineUsers.entries()) {
        if (user.socketId === socket.id) {
          onlineUsers.delete(userId);

          // Fetch fixedLocations from the organization
          const organization = await Organization.findOne({ orgEmail: user.orgEmail });
          if (organization) {
            io.emit("updateLocations", organization.fixedLocations); // Send fixed locations to all clients
          }
          break;
        }
      }

      io.emit("onlineUsers", Array.from(onlineUsers.values()).map(user => ({
        userId: user.userId,
        userName: user.userName,
      })));
    });
  });
};
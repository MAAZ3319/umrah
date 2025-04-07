// import { getDistance } from "../utils/distance.js";
// import Organization from "../models/Organization.js";

// const onlineUsers = new Map(); // Track online users

// export const handleLocationTracking = (io) => {
//   io.on("connection", (socket) => {
//     console.log("🟢 User connected:", socket.id);

//     socket.on("updateLocation", async ({ latitude, longitude, name, orgEmail }) => {
//       console.log(`📡 Received location update from ${name}:`, { latitude, longitude });

//       if (!latitude || !longitude) {
//         console.error("❌ Invalid location data received:", { latitude, longitude });
//         return;
//       }
//       if (!orgEmail) {
//         console.error("❌ orgEmail is missing in updateLocation event");
//         return;
//       }

//       try {
//         const organization = await Organization.findOne({ orgEmail });
//         if (!organization) {
//           return console.error("❌ Organization not found");
//         }

//         const { orgLat, orgLng, fixedLocations } = organization;
//         const orgDistance = getDistance(latitude, longitude, orgLat, orgLng);

//         let alerts = [];
//         if (orgDistance > 500) {
//           alerts.push("🚨 You are outside the 500m safe area!");
//         }

//         if (Array.isArray(fixedLocations)) {
//           fixedLocations.forEach((loc) => {
//             const locDistance = getDistance(latitude, longitude, loc.latitude, loc.longitude);
//             if (locDistance <= 500) {
//               alerts.push(`🗺️ You are near ${loc.name}`);
//             }
//           });
//         }

//         if (alerts.length > 0) {
//           socket.emit("alert", { messages: alerts });
//         }

//         // Track online users
//         onlineUsers.set(socket.id, { socketId: socket.id, latitude, longitude, name, orgEmail });

//         // Broadcast updates
//         console.log("👥 Broadcasting online users:", Array.from(onlineUsers.values()));
//         io.emit("onlineUsers", Array.from(onlineUsers.values())); // Send online users to all clients
//       } catch (error) {
//         console.error("❌ Location Update Error:", error);
//         socket.emit("error", { message: "An error occurred while updating location." });
//       }
//     });

//     socket.on("disconnect", () => {
//       onlineUsers.delete(socket.id);
//       io.emit("onlineUsers", Array.from(onlineUsers.values()));
//       console.log("🔴 User disconnected:", socket.id);
//     });
//   });
// };




import { getDistance } from "../utils/distance.js";
import Organization from "../models/Organization.js";
import User from "../models/User.js"; // ✅ Import User model

const onlineUsers = new Map(); // Track online users

export const handleLocationTracking = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id );

    socket.on("updateLocation", async ({ latitude, longitude, name, orgEmail, email }) => {
      console.log(`📡 Received location update from ${name}:${email}`, { latitude, longitude });

      console.log("Looking for user with email:", email);

      const user = await User.findOne({ email });

      if (!user) {
        console.error("❌ User not found in database");
        return;
      }

      if (!latitude || !longitude) {
        console.error("❌ Invalid location data received:", { latitude, longitude });
        return;
      }
      if (!orgEmail) {
        console.error("❌ orgEmail is missing in updateLocation event");
        return;
      }

      try {
        const organization = await Organization.findOne({ orgEmail });
        if (!organization) {
          return console.error("❌ Organization not found");
        }

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

        // Track online users
        onlineUsers.set(socket.id, { socketId: socket.id, latitude, longitude, name: user.name, orgEmail, phone: user.phone,
          photo: user.photo, });

        // Broadcast updates
        console.log("👥 Broadcasting online users:", Array.from(onlineUsers.values()));
        io.emit("onlineUsers", Array.from(onlineUsers.values())); // Send online users to all clients
      } catch (error) {
        console.error("❌ Location Update Error:", error);
        socket.emit("error", { message: "An error occurred while updating location." });
      }
    });

    socket.on("disconnect", () => {
      onlineUsers.delete(socket.id);
      io.emit("onlineUsers", Array.from(onlineUsers.values()));
      console.log("🔴 User disconnected:", socket.id);
    });
  });
};


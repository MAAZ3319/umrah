import { getDistance } from "../utils/distance.js";
import Organization from "../models/Organization.js";

const onlineUsers = new Map(); // Track online users

export const handleLocationTracking = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("updateLocation", async ({ latitude, longitude, userName, orgEmail }) => {

      console.log(`Received location update from ${userName}:`, { latitude, longitude });
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

        // Track online users
        onlineUsers.set(socket.id, { socketId: socket.id, latitude, longitude, userName, orgEmail });

        // Broadcast updates
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
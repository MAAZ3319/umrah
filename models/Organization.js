// // backend/models/Organization.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   mobile: { type: String, required: true },
//   password: { type: String, required: true },
// });

// const organizationSchema = new mongoose.Schema({
//   orgName: { type: String, required: true },
//   orgId: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   users: [userSchema],
// });

// const Organization = mongoose.model("Organization", organizationSchema);

// export default Organization;




// ------new project---






// import mongoose from "mongoose";

// const organizationSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   secretKey: { type: String, required: true },
// });

// export default mongoose.model("Organization", organizationSchema);


// models/Organization.js
// import mongoose from "mongoose";

// const organizationSchema = new mongoose.Schema({
//   orgEmail: { type: String, required: true, unique: true },
//   orgPhone: { type: String, required: true },
//   secretKey: { type: String, required: true },
// });

// const Organization = mongoose.model("Organization", organizationSchema);

// export default Organization;


// models/Organization.js
// import mongoose from "mongoose";

// const organizationSchema = new mongoose.Schema({
//   orgEmail: { type: String, required: true, unique: true },
//   orgPhone: { type: String, required: true },
//   secretKey: { type: String, required: true },
//   orgLat: { type: Number, required: true }, // Latitude for tracking
//   orgLng: { type: Number, required: true }, // Longitude for tracking
// });

// const Organization = mongoose.model("Organization", organizationSchema);
// export default Organization;



// models/Organization.js
import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const organizationSchema = new mongoose.Schema({
  orgEmail: { type: String, required: true, unique: true },
  orgPhone: { type: String, required: true },
  secretKey: { type: String, required: true },
  orgLat: { type: Number, required: true },
  orgLng: { type: Number, required: true },
  fixedLocations: [locationSchema], // Store multiple fixed locations
});

const Organization = mongoose.model("Organization", organizationSchema);
export default Organization;

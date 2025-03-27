// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   orgId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   mobile: { type: String, required: true },
//   password: { type: String, required: true },
//   location: {
//     lat: { type: Number },
//     lng: { type: Number },
//   },
// });

// const User = mongoose.model("User", userSchema);
// export default User;



// ----new project-----




// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
// });



// export default mongoose.model("User", userSchema);
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  role: { type: String, enum: ["admin", "user"], default: "user" }, // Added role
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;

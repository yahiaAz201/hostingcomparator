import mongoose from "mongoose";

const adminsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "BLOGGER"],
    required: true,
  },
});

adminsSchema.pre("validate", function (next) {
  this.role = this.role.toUpperCase();
  next();
});

const Admins = mongoose.model("Admins", adminsSchema);

export default Admins;

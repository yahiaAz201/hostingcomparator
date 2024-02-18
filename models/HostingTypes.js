import mongoose from "mongoose";

const featuresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ["STRING", "BOOLEAN", "NUMBER"],
  },
  exclusive: {
    type: Boolean,
    default: false,
  },
  prefix: {
    type: String,
    default: "",
  },
  suffix: {
    type: String,
    default: "",
  },
});

featuresSchema.pre("validate", function (next) {
  this.type = this.type.toUpperCase();
  next();
});

featuresSchema.pre("updateOne", function (next) {
  this.type = this.type.toUpperCase();
  next();
});

featuresSchema.pre("save", function (next) {
  this.type = this.type.toUpperCase();
  next();
});

const hostingTypesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: [true, "Please provide an Image "],
  },
  features: [featuresSchema],
});

const HostingTypes = mongoose.model("HostingTypes", hostingTypesSchema);

export default HostingTypes;

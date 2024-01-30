import mongoose from "mongoose";

import Hostings from "./Hostings.js";

const featuresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ["STRING", "BOOLEAN", "NUMBER"],
    required: true,
  },
  exclusive: {
    type: Boolean,
    default: false,
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

featuresSchema.pre("deleteMany", async function (next) {
  const ids = this._conditions._id.$in;

  let hostings = await Hostings.updateMany(
    { "features.type": { $in: ids } },
    { $pull: { features: { type: { $in: ids } } } }
  );

  next();
});

const Features = mongoose.model("Features", featuresSchema);

export default Features;

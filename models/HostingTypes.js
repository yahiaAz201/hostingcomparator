import mongoose from "mongoose";

const hostingTypesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const HostingTypes = mongoose.model("HostingTypes", hostingTypesSchema);

export default HostingTypes;

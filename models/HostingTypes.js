import mongoose from "mongoose";

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
});

const HostingTypes = mongoose.model("HostingTypes", hostingTypesSchema);

export default HostingTypes;

import mongoose from "mongoose";

const hostingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hostingType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HostingTypes",
    required: true,
  },
  affiliateLink: {
    type: String,
    required: false,
  },
  features: [
    {
      type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Features",
        required: true,
      },
      value: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
    },
  ],
});

const Hostings = mongoose.model("Hostings", hostingsSchema);

Hostings.itsSchema = hostingsSchema;

export default Hostings;

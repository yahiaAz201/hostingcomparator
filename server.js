import path from "path";
import url from "url";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import express from "express";

import featuresRoute from "./routes/featuresRoute.js";
import hostingsTypesRoute from "./routes/hostingsTypesRoute.js";
import hostingsRoute from "./routes/hostingsRoute.js";

import authRoute from "./routes/authRoute.js";
import adminsRoute from "./routes/adminsRoute.js";
import postsRoute from "./routes/postsRoute.js";

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const DB_URI = process.env.DB_URI;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, "public")));
app.use("/img", express.static(path.resolve(__dirname, "uploads")));

app.use("/api/hostings-features", featuresRoute);
app.use("/api/hostings-types", hostingsTypesRoute);
app.use("/api/hostings", hostingsRoute);

app.use("/api/auth", authRoute);

app.use("/api/admins", adminsRoute);

app.use("/api/posts", postsRoute);

try {
  await mongoose.connect(DB_URI);
  app.listen(PORT, () => {
    console.log(`Example app listening on port `, PORT);
  });
} catch (error) {
  console.log("Unable to connect to database");
}

import { Router } from "express";
import hostingTypesController from "../controllers/hostingTypesController.js";
import allowedRoles from "../middlewares/allowedRoles.js";
import upload from "../middlewares/upload.js";

const hostingTypesRoute = Router();

hostingTypesRoute.get("/", hostingTypesController.get);
hostingTypesRoute.post(
  "/",
  allowedRoles(["ADMIN", "BLOGGER"]),
  upload.single("image"),
  hostingTypesController.add
);
hostingTypesRoute.put(
  "/:id",
  allowedRoles(["ADMIN", "BLOGGER"]),
  upload.single("image"),
  hostingTypesController.edit
);
hostingTypesRoute.delete(
  "/:id",
  allowedRoles(["ADMIN", "BLOGGER"]),
  hostingTypesController.remove
);

export default hostingTypesRoute;

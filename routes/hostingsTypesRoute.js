import { Router } from "express";
import hostingTypesController from "../controllers/hostingTypesController.js";
import allowedRoles from "../middlewares/allowedRoles.js";

const hostingTypesRoute = Router();

hostingTypesRoute.get("/", hostingTypesController.get);
hostingTypesRoute.post(
  "/",
  allowedRoles(["ADMIN", "BLOGGER"]),
  hostingTypesController.add
);
hostingTypesRoute.put(
  "/:id",
  allowedRoles(["ADMIN", "BLOGGER"]),
  hostingTypesController.edit
);
hostingTypesRoute.delete(
  "/:id",
  allowedRoles(["ADMIN", "BLOGGER"]),
  hostingTypesController.remove
);

export default hostingTypesRoute;

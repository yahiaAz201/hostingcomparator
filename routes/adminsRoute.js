import { Router } from "express";
import adminsController from "../controllers/adminsController.js";

import allowedRoles from "../middlewares/allowedRoles.js";

const adminsRoute = Router();

adminsRoute.get("/", allowedRoles(["ADMIN"]), adminsController.get);
adminsRoute.post("/", allowedRoles(["ADMIN"]), adminsController.add);
adminsRoute.put(
  "/:id",
  allowedRoles(["ADMIN", "BLOGGER"]),
  adminsController.edit
);
adminsRoute.delete("/", allowedRoles(["ADMIN"]), adminsController.remove);

export default adminsRoute;

import { Router } from "express";

import featuresController from "../controllers/featuresController.js";
import allowedRoles from "../middlewares/allowedRoles.js";

const featuresRoute = Router();

featuresRoute.get("/", featuresController.get);
featuresRoute.post(
  "/",
  allowedRoles(["ADMIN", "BLOGGER"]),
  featuresController.add
);
featuresRoute.put(
  "/:id",
  allowedRoles(["ADMIN", "BLOGGER"]),
  featuresController.edit
);
featuresRoute.delete(
  "/",
  allowedRoles(["ADMIN", "BLOGGER"]),
  featuresController.remove
);

export default featuresRoute;

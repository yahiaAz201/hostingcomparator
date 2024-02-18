import { Router } from "express";

import featuresController from "../controllers/featuresController.js";
import allowedRoles from "../middlewares/allowedRoles.js";

const featuresRoute = Router();

featuresRoute.get("/:id", featuresController.get);
featuresRoute.post(
  "/:id",
  allowedRoles(["ADMIN", "BLOGGER"]),
  featuresController.add
);
featuresRoute.put(
  "/:id",
  allowedRoles(["ADMIN", "BLOGGER"]),
  featuresController.edit
);
featuresRoute.delete(
  "/:id",
  allowedRoles(["ADMIN", "BLOGGER"]),
  featuresController.remove
);

export default featuresRoute;

import { Router } from "express";
import hostingsController from "../controllers/hostingsController.js";
import allowedRoles from "../middlewares/allowedRoles.js";

const hostingsRouter = Router();

hostingsRouter.get("/", hostingsController.get);
hostingsRouter.post(
  "/",
  allowedRoles(["ADMIN", "BLOGGER"]),
  hostingsController.add
);
hostingsRouter.put(
  "/:id",
  allowedRoles(["ADMIN", "BLOGGER"]),
  hostingsController.edit
);
hostingsRouter.delete(
  "/",
  allowedRoles(["ADMIN", "BLOGGER"]),
  hostingsController.remove
);

export default hostingsRouter;

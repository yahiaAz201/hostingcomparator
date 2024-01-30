import { Router } from "express";
import postsController from "../controllers/postsController.js";
import upload from "../middlewares/upload.js";
import allowedRoles from "../middlewares/allowedRoles.js";

const postsRoute = Router();

postsRoute.get("/:id?", postsController.get);
postsRoute.post(
  "/",
  allowedRoles(["ADMIN", "BLOGGER"]),
  upload.single("image"),
  postsController.add
);
postsRoute.put(
  "/:id",
  allowedRoles(["ADMIN", "BLOGGER"]),
  upload.single("image"),
  postsController.edit
);
postsRoute.delete(
  "/:id",
  allowedRoles(["ADMIN", "BLOGGER"]),
  postsController.remove
);

export default postsRoute;

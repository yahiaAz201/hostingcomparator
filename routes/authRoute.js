import { Router } from "express";
import usersController from "../controllers/usersController.js";

const authRoute = Router();

authRoute.post("/login", usersController.login);
authRoute.post("/signup", usersController.signup);

export default authRoute;

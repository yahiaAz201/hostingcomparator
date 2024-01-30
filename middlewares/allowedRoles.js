import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

import Admins from "../models/Admins.js";

const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

function allowedRoles(roles) {
  return async function (req, res, next) {
    const token = req.headers["token"];
    const admins = await Admins.find();
    let user;

    if (admins.length > 0) {
      if (!token)
        return res.send({ success: false, error: "no token provided" });

      try {
        user = jwt.verify(token, JWT_SECRET_TOKEN);
      } catch (error) {
        console.log(error.message);
        res.send({ success: false, error: "invalid token provided" });
      }
      const userRole = user.role.toUpperCase();
      const allowedRoles = roles.map((role) => role.toUpperCase());
      const allowed = allowedRoles.includes(userRole);
      if (!allowed) {
        return res.send({
          success: false,
          error: "You are not authorized to perform this action.",
        });
      }
    }

    req.user = user;
    return next();
  };
}

export default allowedRoles;

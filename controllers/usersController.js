import dotenv from "dotenv";
dotenv.config();
import _ from "underscore";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";
import Admins from "../models/Admins.js";

const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

const login = async (req, res) => {
  try {
    const _user = _.pick(req.body, ["email", "password"]);
    const admin = await Admins.findOne({ email: _user?.email });
    let user = await Users.findOne({ email: _user?.email });
    user = admin || user;
    if (!user || _user.password != user.password)
      return res.status(401).send({
        success: false,
        error: "Incorrect email or password !",
      });

    const token = jwt.sign(
      _.pick(user, ["_id", "email", "name", "username", "role"]),
      JWT_SECRET_TOKEN
    );

    res.send({ success: true, package: token });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};

const signup = async (req, res) => {
  try {
    let user = _.pick(req.body, ["email", "password"]);

    const isExist = await Users.findOne({ email: user?.email });
    if (isExist)
      return res.status(409).send({
        success: false,
        error: "A user already exists with this email. Please try logging in.",
      });

    user = new Users(user);
    user = await user.save();

    const token = jwt.sign(_.pick(user, ["email"]), JWT_SECRET_TOKEN);
    res.send({ success: true, package: token, user: user });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};

export default {
  login,
  signup,
};

import _ from "underscore";
import Admins from "../models/Admins.js";

const get = async (req, res) => {
  try {
    const admins = await Admins.find();
    res.send({
      success: true,
      package: admins,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      package: error.message,
    });
  }
};
const add = async (req, res) => {
  try {
    const doc = _.pick(req.body, ["name", "email", "password", "role"]);
    const isExist = await Admins.findOne({ email: doc?.email });
    if (isExist)
      return res
        .status(409)
        .send({ success: false, error: "This user already Exist" });

    let admin = new Admins(doc);
    admin = await admin.save();

    res.send({
      success: true,
      package: admin,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};
const edit = async (req, res) => {
  try {
    const id = req.params.id;
    const isExist = await Admins.findOne({ _id: id });
    if (!isExist)
      return res
        .status(404)
        .send({ success: false, error: "No admin found by this id" });

    const updateFields = _.pick(req.body, [
      "name",
      "email",
      "password",
      "role",
    ]);

    if (updateFields["role"])
      updateFields["role"] = updateFields["role"].toUpperCase();

    const newAdmin = await Admins.findOneAndUpdate(
      { _id: id },
      { $set: updateFields },
      { new: true, runValidators: true, context: "query" }
    );

    res.send({
      success: true,
      package: newAdmin,
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const ids = req.body.ids;

    const deleted_admins = await Admins.deleteMany({
      _id: { $in: ids },
    });

    res.send({ success: true, package: deleted_admins });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};

export default {
  get,
  add,
  edit,
  remove,
};

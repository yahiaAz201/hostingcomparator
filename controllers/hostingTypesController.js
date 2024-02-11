import path from "path";
import url from "url";
import fs from "fs";

import _ from "underscore";
import HostingTypes from "../models/HostingTypes.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const get = async (req, res) => {
  try {
    const hostingTypes = await HostingTypes.find();
    res.send({
      success: true,
      package: hostingTypes,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};
const add = async (req, res) => {
  try {
    const doc = _.pick(req.body, ["name"]);

    const isExist = await HostingTypes.findOne({ name: doc?.name });

    if (isExist)
      return res.send({
        success: false,
        error: "Hosting type already exist",
      });

    let hostingType = new HostingTypes(doc);
    const image = "/img/" + req.file.filename;
    hostingType.image = image;
    hostingType = await hostingType.save();

    res.send({
      success: true,
      package: hostingType,
    });
  } catch (error) {
    res.status(500).status(500).send({
      success: false,
      error: error.message,
    });
  }
};
const edit = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res.send({
        success: false,
        error: "no id provided",
      });

    let hostingType = await HostingTypes.findOne({ _id: id });
    if (!hostingType)
      return res.send({
        success: false,
        error: "No hosting type found by this ID",
      });

    const updateFields = _.pick(req.body, ["name"]);

    if (req.file) {
      if (hostingType.image) {
        const old_image_name =
          hostingType.image.split("/")[hostingType.image.split("/").length - 1];

        const old_image_path = path.resolve(
          __dirname,
          "../uploads",
          old_image_name
        );

        if (fs.existsSync(old_image_path)) fs.unlinkSync(old_image_path);
      }

      updateFields["image"] = "/img/" + req.file.filename;
    }

    const newHostingType = await HostingTypes.findOneAndUpdate(
      { _id: id },
      { $set: updateFields },
      { new: true }
    );

    res.send({
      success: true,
      package: newHostingType,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res.send({
        success: false,
        error: "No id provided",
      });

    let hostingType = await HostingTypes.findOne({ _id: id });
    if (!hostingType)
      return res.send({
        success: false,
        error: "No Hosting Type found by this id",
      });

    const deleted_hostingType = await HostingTypes.deleteOne({ _id: id });

    res.send({ success: true, package: deleted_hostingType });
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

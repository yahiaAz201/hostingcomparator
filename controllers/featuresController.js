import _ from "underscore";
import Features from "../models/Features.js";
import HostingTypes from "../models/HostingTypes.js";

const get = async (req, res) => {
  try {
    const id = req.params.id;
    const hosting_type = await HostingTypes.findOne({ _id: id });
    const features = hosting_type["features"];

    res.send({
      success: true,
      package: features,
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
    const id = req.params.id;
    const feature = req.body;

    let hosting_type = await HostingTypes.findOne({ _id: id });
    if (!hosting_type)
      return res
        .status(404)
        .send({ success: false, error: "No Hosting Type Found by this _id" });

    const isExist = hosting_type["features"].find(
      (_feature) => _feature.name == feature.name
    );
    if (isExist)
      return res
        .status(400)
        .send({ success: false, error: "dupilcate feature name" });

    hosting_type["features"].push(feature);

    hosting_type = await hosting_type.save();

    const new_features = hosting_type["features"];

    res.send({
      success: true,
      package: new_features,
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
    const { feature_id, ...updateFields } = _.pick(req.body, [
      "feature_id",
      "name",
      "type",
      "description",
      "suffix",
      "prefix",
    ]);

    let hosting_type = await HostingTypes.findOne({ _id: id });
    if (!hosting_type)
      return res
        .status(404)
        .send({ success: false, error: "No Hosting Type Found by this _id" });

    let feature_index = hosting_type["features"].findIndex(
      (_feature) => _feature["_id"] == feature_id
    );
    if (feature_index == -1)
      return res.send({ success: false, error: "no feature found by this id" });

    const old_feature = hosting_type["features"][feature_index];
    const new_feature = Object.assign(old_feature, updateFields);

    hosting_type["features"][feature_index] = new_feature;
    hosting_type = await hosting_type.save();

    res.send({
      success: true,
      package: hosting_type,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.stack,
    });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const ids = req.body.ids;

    let hosting_type = await HostingTypes.findOne({ _id: id });
    if (!hosting_type)
      return res
        .status(404)
        .send({ success: false, error: "No Hosting Type Found by this _id" });

    const new_feature = hosting_type["features"].filter(
      (hosting_type) => !ids.includes(hosting_type["_id"].toString())
    );

    hosting_type["features"] = new_feature;

    hosting_type = await hosting_type.save();

    res.send({ success: true, package: hosting_type });
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

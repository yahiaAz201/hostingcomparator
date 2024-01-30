import _ from "underscore";
import Features from "../models/Features.js";

const get = async (req, res) => {
  try {
    const features = await Features.find();
    res.send({
      success: true,
      package: features,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
};

const add = async (req, res) => {
  try {
    const doc = req.body;

    const isExist = await Features.findOne({ name: doc?.name });
    if (isExist)
      return res.send({ success: false, error: "dupilcate feature name" });
    let feature = await Features(doc);
    feature = await feature.save();
    res.send({
      success: true,
      package: feature,
    });
  } catch (error) {
    res.send({
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

    let feature = await Features.findOne({ _id: id });
    if (!feature)
      return res.send({ success: false, error: "no feature found by this id" });

    const updateFields = _.pick(req.body, [
      "name",
      "type",
      "description",
      "exclusive",
    ]);
    const newFeature = await Features.findOneAndUpdate(
      { _id: id },
      { $set: updateFields },
      { new: true }
    );

    res.send({
      success: true,
      package: newFeature,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const ids = req.body.ids;
    const deleted_features = await Features.deleteMany({
      _id: { $in: ids },
    });

    res.send({ success: true, package: deleted_features });
  } catch (error) {
    res.send({
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

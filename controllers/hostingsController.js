import Hostings from "../models/Hostings.js";

const get = async (req, res) => {
  const populate = parseInt(req.query.populate) || -1;
  try {
    let hostings;
    hostings = await Hostings.find();
    if (populate > 0)
      hostings = await Hostings.populate(hostings, [
        { path: "features.type" },
        { path: "hostingType" },
      ]);

    res.send({
      success: true,
      package: hostings,
      populate,
    });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

const add = async (req, res) => {
  try {
    const doc = req.body;

    const isExist = await Hostings.findOne({ name: doc?.name });
    if (isExist?.hostingType == doc.hostingType)
      return res.send({ success: false, error: "Hosting already exist" });

    let hosting = new Hostings(doc);
    hosting = await hosting.save();

    res.send({
      success: true,
      package: hosting,
    });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

const edit = async (req, res) => {
  try {
    const id = req.params.id;

    let hosting = await Hostings.findOne({ _id: id });
    if (!hosting)
      return res.send({
        success: false,
        error: "No hosting found by this ID",
      });

    const updateFields = req.body;
    const newHosting = await Hostings.findOneAndUpdate(
      { _id: id },
      { $set: updateFields },
      { new: true }
    );
    res.send({
      success: true,
      package: newHosting,
    });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const ids = req.body.ids;
    const deleted_hostings = await Hostings.deleteMany({
      _id: { $in: ids },
    });

    res.send({ success: true, package: deleted_hostings });
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

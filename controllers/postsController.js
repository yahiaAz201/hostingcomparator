import path from "path";
import url from "url";
import fs from "fs";
import Posts from "../models/Posts.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const get = async (req, res) => {
  const id = req.params?.id;
  try {
    let posts = [];
    if (id) {
      posts = await Posts.findOne({ _id: id });
    } else {
      posts = await Posts.find();
    }

    res.send({ success: true, package: posts });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
};

const add = async (req, res) => {
  try {
    if (!req.file)
      return res.send({ success: false, error: "Thumbnail is required" });

    const thumbnail = "http://192.168.1.6:3001" + "/img/" + req.file.filename;

    let post = new Posts({ ...req.body });
    post.thumbnail = thumbnail;
    post = await post.save();
    res.send({ success: true, package: post });
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
    const isExist = await Posts.findOne({ _id: id });
    if (!isExist)
      return res.send({ success: false, error: "No post found by this id" });

    const updateFields = req.body;

    if (req.file) {
      const old_image_name =
        isExist.thumbnail.split("/")[isExist.thumbnail.split("/").length - 1];

      const old_image_path = path.resolve(
        __dirname,
        "../uploads",
        old_image_name
      );

      fs.unlinkSync(old_image_path);

      updateFields["thumbnail"] =
        "http://192.168.1.6:3001" + "/img/" + req.file.filename;
    }
    const newPost = await Posts.findOneAndUpdate(
      { _id: id },
      { $set: updateFields },
      { new: true }
    );

    res.send({
      success: true,
      package: newPost,
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
    const id = req.params.id;
    const isExist = await Posts.findOne({ _id: id });
    if (!isExist)
      return res.send({ success: false, error: "No post found by this id" });

    const deleted_post = await Posts.deleteOne({ _id: id });

    const old_image_name =
      isExist.thumbnail.split("/")[isExist.thumbnail.split("/").length - 1];

    const old_image_path = path.resolve(
      __dirname,
      "../uploads",
      old_image_name
    );

    fs.unlinkSync(old_image_path);

    res.send({ success: true, package: deleted_post });
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

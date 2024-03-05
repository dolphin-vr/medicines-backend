import { controlWrapper } from "../decorators/index.js";
import Shop from "../models/Shop.js";
import { HttpError } from "../helpers/HttpError.js";

const getShops = async (req, res) => {
  const result = await Shop.find();
  res.json(result);
};

const deleteAll = async (req, res, next) => {
  const result = await Shop.deleteMany();
  if (!result) {
    next(new HttpError(404, "X3 what wrong"));
  }
  res.json(result);
};

export default {
  getShops: controlWrapper(getShops),
  deleteAll: controlWrapper(deleteAll),
};

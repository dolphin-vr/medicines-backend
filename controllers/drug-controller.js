import { controlWrapper } from "../decorators/index.js";
import Drug from "../models/Drug.js";
import { HttpError } from "../helpers/HttpError.js";

const getDrug = async (req, res) => {
  const result = await Drug.find();
  res.json(result);
};

const deleteAll = async (req, res, next) => {
  const result = await Drug.deleteMany();
  if (!result) {
    next(new HttpError(404, "X3 what wrong"));
  }
  res.json(result);
};

export default {
  getDrug: controlWrapper(getDrug),
  deleteAll: controlWrapper(deleteAll),
};

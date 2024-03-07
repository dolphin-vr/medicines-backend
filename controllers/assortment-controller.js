import { controlWrapper } from "../decorators/index.js";
import Assortment from "../models/Assortment.js";
import { HttpError } from "../helpers/HttpError.js";

const getAssortment = async (req, res) => {
  const result = await Assortment.find();
  res.json(result);
};

const add = async (req, res, next) => {
  const result = await Assortment.create({ ...req.body});
  res.status(201).json(result);
};

const deleteAll = async (req, res, next) => {
  const result = await Assortment.deleteMany();
  if (!result) {
    next(new HttpError(404, "X3 what wrong"));
  }
  res.json(result);
};

export default {
  getAssortment: controlWrapper(getAssortment),
  add: controlWrapper(add),
  deleteAll: controlWrapper(deleteAll),
};

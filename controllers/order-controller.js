import { controlWrapper } from "../decorators/index.js";
import Order from "../models/Order.js";
import { HttpError } from "../helpers/HttpError.js";

const addOrder = async (req, res, next) => {
  const result = await Order.create({ ...req.body });
  res.status(201).json(result);
};

// update order info
const editOrder = async (req, res, next) => {
  // const order=await Order.findByIdAndUpdate(id, {})
  const result = await Order.findOneAndUpdate({ order: req.params.id }, req.body); // test
  res.status(200).json(result);
};

const deleteAll = async (req, res, next) => {
  const result = await Order.deleteMany();
  if (!result) {
    next(new HttpError(404, "X3 what wrong"));
  }
  res.json(result);
};

// const getOrderById = async (req, res) => {
//   const result = await Order.find();
//   res.json(result);
// };

export default {
  addOrder: controlWrapper(addOrder),
  deleteAll: controlWrapper(deleteAll),
};

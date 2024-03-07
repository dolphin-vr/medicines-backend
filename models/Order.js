import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, preUpdate } from "./hooks.js";

const statusList = ["carting", "purchased", "processing", "complete"];
const orderSchema = new Schema(
  {
    order: {
      type: Number,
      required: [true, "Set number of order"],
      min: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "shop",
      required: true,
    },
    status: {
      type: String,
      enum: statusList,
      required: true,
    },
    goods: [
      {
        drug: {
          type: Schema.Types.ObjectId,
          ref: "drug",
          required: true,
        },
        price: {
          type: Number,
          required: [true, "Set price of drug"],
          min: 0,
        },
        amount: {
          type: Number,
          required: [true, "Set amount of drug"],
          min: 0,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

orderSchema.post("save", handleSaveError);
orderSchema.pre("findOneAndUpdate", preUpdate);
orderSchema.post("findOneAndUpdate", handleSaveError);

const Order = model("order", orderSchema);

export const orderAddSchema = Joi.object({
  status: Joi.string()
    .valid(...statusList)
    .required(),
});

export default Order;


  // price: Joi.number().required().min(0).messages({
  //   "any.required": "missing required 'price' field",
  //   "string.base": "'price' must be number",
  // }),
  // amount: Joi.number().required().min(0).messages({
  //   "any.required": "missing required 'amount' field",
  //   "string.base": "'amount' must be number",
  // }),
import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, preUpdate } from "./hooks.js";

const assortmentSchema = new Schema(
  {
    drug: {
      type: Schema.Types.ObjectId,
      ref: "drug",
      required: true,
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "shop",
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Set price of drug"],
      min: 0,
      max: 5000,
    },
    amount: {
      type: Number,
      required: [true, "Set amount of drug"],
      min: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

assortmentSchema.post("save", handleSaveError);
assortmentSchema.pre("findOneAndUpdate", preUpdate);
assortmentSchema.post("findOneAndUpdate", handleSaveError);

const Assortment = model("assortment", assortmentSchema, "assortment");

export const assortmentAddSchema = Joi.object({
  price: Joi.number().required().min(0).max(5000).messages({
    "any.required": "missing required 'price' field",
    "string.base": "'price' must be number",
  }),
  amount: Joi.number().required().min(0).messages({
    "any.required": "missing required 'amount' field",
    "string.base": "'amount' must be number",
  }),
});

export default Assortment;

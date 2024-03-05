import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, preUpdate } from "./hooks.js";

const shopSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name of record"],
    },
    address: {
      type: String,
      required: [true, "Set address of record"],
    },
  },
  { versionKey: false, timestamps: true }
);

shopSchema.post("save", handleSaveError);
shopSchema.pre("findOneAndUpdate", preUpdate);
shopSchema.post("findOneAndUpdate", handleSaveError);

const Shop = model("shop", shopSchema);

export const shopAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required 'name' field",
    "string.base": "'name' must be string",
  }),
  address: Joi.string().required().messages({
    "any.required": "missing required 'address' field",
    "string.base": "'address' must be string",
  }),
});

export default Shop;

import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, preUpdate } from "./hooks.js";

const drugSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name of drug"],
    },
    url: {
      type: Number,
      required: [true, "Set img-code of drug"],
    },
  },
  { versionKey: false, timestamps: true }
);

drugSchema.post("save", handleSaveError);
drugSchema.pre("findOneAndUpdate", preUpdate);
drugSchema.post("findOneAndUpdate", handleSaveError);

const Drug = model("drug", drugSchema);

export const drugAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required 'name' field",
    "string.base": "'name' must be string",
  }),
  url: Joi.number().required().messages({
    "any.required": "missing required 'url-code' field",
    "string.base": "'url-code' must be string",
  }),
});

export default Drug;

import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      minLength: 3,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Set phone of record"],
    },
    address: {
      type: String,
      required: [true, "Set address of record"],
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", preUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export const SignUpSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    "any.required": "missing required field 'email'",
    "string.pattern.base": "'email' must be valid e-mail",
  }),
  password: Joi.string().required().min(8).max(48).messages({
    "any.required": "missing required field 'password'",
    "string.base": "'password' must be string",
  }),
});

export const SignInSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    "any.required": "missing required field 'email'",
    "string.pattern.base": "'email' must be valid e-mail",
  }),
  password: Joi.string().required().min(8).max(48).messages({
    "any.required": "missing required field 'password'",
    "string.base": "'password' must be string",
  }),
});

export const RemindSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    "any.required": "missing required field 'email'",
    "string.pattern.base": "'email' must be valid e-mail",
  }),
});

export const ResetPwdSchema = Joi.object({
   email: Joi.string().required().pattern(emailRegexp).messages({
      "any.required": "missing required field 'email'",
      "string.pattern.base": "'email' must be valid e-mail",
   }),
   password: Joi.string().required().min(8).max(48).messages({
      "any.required": "missing required field 'password'",
      "string.base": "'password' must be string",
   }),
});

export const VerifySchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    "any.required": "missing required field 'email'",
    "string.pattern.base": "'email' must be valid e-mail",
  }),
});

export const UpdateUserInfoSchema = Joi.object({
  username: Joi.string().min(3).messages({
    "string.base": "{#label} must be string",
  }),
  email: Joi.string().pattern(emailRegexp).messages({
    "string.pattern.base": "{#label} must be valid e-mail",
  }),
  password: Joi.string().min(8).max(48).messages({
    "string.base": "{#label} must be string",
  }),
  newPassword: Joi.string().min(8).max(48).messages({
    "string.base": "{#label} must be string",
  }),
});


export default User;

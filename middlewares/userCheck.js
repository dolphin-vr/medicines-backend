import jwt from "jsonwebtoken";
import { controlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/HttpError.js";
import User from "../models/User.js";

const {JWT_SECRET} = process.env;

const userCheck = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.user.email, phone: req.body.user.phone });
     if (!user) {
       user = await User.create({ ...req.body.user });
    }
    req.user = user;
    next();
  } catch (error) {
    next(new HttpError(401, "Not authorized"));
  }
};

export default controlWrapper(userCheck);
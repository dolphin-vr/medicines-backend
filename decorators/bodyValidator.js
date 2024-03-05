import { HttpError } from "../helpers/HttpError.js";

const bodyValidator = (schema) => (req, res, next) => {
   //  console.log("bodyValidator in = ", Date.now());
   const { error } = schema.validate(req.body);
   if (error) {
      return next(new HttpError(400, error.message));
   }
   //  console.log("bodyValidator out = ", Date.now());
   next();
};

export default bodyValidator;

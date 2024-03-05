import { HttpError } from "../helpers/HttpError.js";

const isEmptyBody = async (req, res, next) => {
    // console.log("isEmptyBody in = ", Date.now());
    const keys = Object.keys(req.body);
    if(!keys.length) {
        return next(new HttpError(400, "Body can not be empty"))
    }
    // console.log("isEmptyBody out = ", Date.now());
    next();
}

export default isEmptyBody;
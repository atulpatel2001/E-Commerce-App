/**
 * this code is validate a token and authorize user
 */

import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/features/customError.js";
import { TryCatch } from "../utils/features/tryCatch.js";

/**
 * this funtion is validate a request
 * params  request,response,next
 */
export const isAuthorized = TryCatch(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Login to Access the Page"));

  const decoded = jwt.verify(token, "thisismysecretjjjnn");

  req.user = await User.findById(decoded.id);
  next();
});

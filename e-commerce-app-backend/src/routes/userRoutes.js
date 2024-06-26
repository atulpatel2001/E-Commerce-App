/**
 * routes for User controller
 */
import express from "express";
import {
  getAllUsers,
  getMyDetails,
  logOutUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userControllers.js";
import { RouteStrings } from "../utils/constants/routeStrings.js";
import { TryCatch } from "../utils/features/tryCatch.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

/**
 * @Request : POST
 * @Route : /users/register
 */
router.route(RouteStrings.REGISTER_USER).post(TryCatch(registerUser));

/**
 * @Request : POST
 * @Route : /users/login
 */
router.route(RouteStrings.LOGIN_USER).post(TryCatch(loginUser));

/**
 * @Request : GET
 * @Route : /users/me
 */
router.route(RouteStrings.USER_SELF).get(isAuthorized, TryCatch(getMyDetails));

/**
 * @Request : GET
 * @Route : /users/all
 */
router.route(RouteStrings.ALL_USERS).get(isAuthorized, TryCatch(getAllUsers));

/**
 * @Request : GET
 * @Route : /users/logout
 */
router.route(RouteStrings.LOGOUT_USER).get(isAuthorized, TryCatch(logOutUser));

/**
 * @Request : PUT
 * @Route : /users/:id
 */
router.route(RouteStrings.UPDATE_USER).put(isAuthorized, TryCatch(updateUser));

export default router;

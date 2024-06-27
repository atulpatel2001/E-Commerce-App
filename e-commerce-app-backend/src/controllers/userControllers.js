import { User } from "../models/User.js";
import ErrorHandler from "../utils/features/customError.js";
import { sendResponse } from "../utils/features/customResponse.js";
import { setCookieWithToken } from "../utils/features/setCookieWithToken.js";

/**
 * Registers a new user by saving their details to the database and setting a JWT token in a cookie.
 *
 * @param {Object} req - Express request object containing user details in req.body
 * @param {Object} res - Express response object used to set cookies and send HTTP response
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} - Promise resolving to a response indicating successful user registration
 */
export const registerUser = async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  console.log(name, email, password, phone)
  if (!name || !email || !password || !phone) {
    return next(new ErrorHandler("All Fields are required", 400));
  }

  const newUser = new User({
    name,
    email,
    password,
    phone,
  });

  const result = await newUser.save();

  setCookieWithToken(res, result);

  return sendResponse(res, true, 201, "User Registered successfully", result);
};

/**
 * Authenticates a user by checking email and password, sets a JWT token in a cookie upon successful login.
 *
 * @param {Object} req - Express request object containing user credentials in req.body
 * @param {Object} res - Express response object used to set cookies and send HTTP response
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} - Promise resolving to a response indicating successful user login
 */

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter both Email and Password", 400));

  const isUserExist = await User.findOne({ email }).select(["+password"]);

  if (!isUserExist) return next(new ErrorHandler("Invalid Credentials", 400));

  const isValidPassword = await isUserExist.comparePassword(password);

  if (!isValidPassword)
    return next(new ErrorHandler("Invalid Credentials", 400));

  setCookieWithToken(res, isUserExist);

  return sendResponse(
    res,
    true,
    200,
    "User Logged in successfully",
    isUserExist
  );
};

/**
 * Fetches details of the currently logged-in user based on user ID stored in req.user._id.
 * Requires user authentication middleware to set req.user.
 *
 * @param {Object} req - Express request object containing user ID in req.user._id
 * @param {Object} res - Express response object used to send HTTP response
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} - Promise resolving to a response containing user details
 */

export const getMyDetails = async (req, res, next) => {
  const id = req.user._id;

  if (!id) return next(new ErrorHandler("Please Login First", 400));

  const userData = await User.findById(id);
  return sendResponse(res, true, 200, null, userData);
};

export const logOutUser = async (req, res, next) => {
  return res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User Logged out Successfully",
    });
};

/**
 * Controller function to fetch all users from the database.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @returns {Promise<void>}
 */
export const getAllUsers = async (req, res, next) => {
  const allusers = await User.find();
  return sendResponse(res, true, 200, null, allusers);
};

/**
 * Controller function to update user in db
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @returns {Promise<void>}
 */
export const updateUser = async (req, res, next) => {
  const userId = req.params.id;

  if (!userId) return next(new ErrorHandler("User Id is required", 400));

  if (userId.length !== 24)
    return next(new ErrorHandler("Invalid User Id", 400));

  const { name, email, password, phone } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      name,
      email,
      password,
      phone,
    },
    {
      new: true,
    }
  );

  if (!updatedUser) return next(new ErrorHandler("Invalid User Id", 400));

  return sendResponse(res, true, 200, "User Updated Successfully", updatedUser);
};


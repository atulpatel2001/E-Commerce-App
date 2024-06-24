/**
 * Middleware function to handle errors in the Express application.
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @returns {Object} JSON response with error details
 */
export const errorMiddleware = (err, req, res, next) => {
  // Set default status code and message for the error
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Customize error message for duplicate key error (MongoDB error code 11000)
  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = "This Email is already Registered !!!";
  }

  // Log the error for debugging purposes
  console.log(err);

  // Send JSON response with the appropriate status code and error message
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

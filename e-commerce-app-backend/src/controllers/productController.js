/**
 * purpose this file perfurm product related logic and send response to client
 */

import { sendResponse } from "../utils/features/customResponse.js";
import { Product } from "../models/Product.js";


/**
 * this function is create a cart
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns
 */


export const createProduct = async (req, res, next) => {
  const { name, price, description, category } = req.body;

  const productImage = req.file;
  console.log(productImage);
  if (!productImage)
    return next(new ErrorHandler("Product image is required", 400));

  const newProduct = await Product.create({
    name,
    price,
    description,
    category: category.toLowerCase(),
    image: productImage.path,
  });

  if (!newProduct)
    return next(new ErrorHandler("Product creation failed, try again", 500));

  return sendResponse(res, true, 201, "Product created successfully");
};

/**
 * Retrieves all products from the database.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} - Promise resolving to a response with all products
 */
export const getAllProducts = async (req, res, next) => {
  const products = await Product.find();
  return sendResponse(res, true, 200, null, products);
};

/**
 * Retrieves a product by its ID from the database.
 *
 * @param {Object} req - Express request object containing params
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} - Promise resolving to a response with the product
 */

export const getProductById = async (req, res, next) => {
  const { id } = req.params;

  if (id.length !== 24)
    return next(new ErrorHandler("Product is not available", 400));
  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product is not available", 404));
  return sendResponse(res, true, 200, null, product);
};

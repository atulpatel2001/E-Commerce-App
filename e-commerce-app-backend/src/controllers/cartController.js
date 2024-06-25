/**
 * this is cart controller , in this cart controller write a all cart related logic like add to cart,update quantity
 */

import { Cart } from "../models/Cart.js";
import ErrorHandler from "../utils/features/customError.js";
import { sendResponse } from "../utils/features/customResponse.js";

export const createCart = async (req, res, next) => {
  console.log(req.user._id)
  const { items } = req.body;
     console.log(items)
  try {
    if (!items || !Array.isArray(items) || items.length === 0) {
  
    }
    else{
      for (const item of items) {
        if (!item.productId || !item.productName || !item.image || !item.price || !item.quantity) {
        }
      }
    }

   
    const newCart = await Cart.create({ user:req.user._id,items});
    res.status(201).json({
      success: true,
      message: 'Cart created successfully',
      cart: newCart,
    });
  } catch (error) {
   
    next(error);
  }
};
/**
 * this function fecth all cart details for particular user
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * @returns response
 */
export const getCartForUser = async (req, res, next) => {
  const usersCart = await Cart.findOne({ user: req.user._id });

  if (!usersCart)
    return next(new ErrorHandler("User doesn't have any cart", 400));

  return sendResponse(res, true, 200, null, usersCart);
};

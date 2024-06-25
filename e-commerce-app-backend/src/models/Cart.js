// Import necessary modules
import { Schema, model } from "mongoose";

// Define the cart schema
const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product", // Assuming you have a Product model
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    isPurchased: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds timestamps for createdAt and updatedAt
  }
);

export const Cart = model("Cart", cartSchema);

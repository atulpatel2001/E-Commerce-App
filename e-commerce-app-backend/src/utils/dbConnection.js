/**
 * db connection file
 */
import mongoose from "mongoose";

/**
 * this is a nodjs connect with mongodb
 * @param {string} connectionString 
 */
export const connectToMongoDb = async (connectionString) => {
  await mongoose
    .connect("mongodb://localhost:27017/ecommercedb")
    .then((data) => {
      const data1 = data.connection
      console.log("DB Connected to : " + data1.name);
    })
    .catch((err) => {
      console.log("Error Connecting to MongoDB : " + err.message);
    });
};

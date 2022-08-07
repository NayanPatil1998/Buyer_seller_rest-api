import Mongoose, { Schema, Document } from "mongoose";
import { IProductModel } from "./product";

export interface IOrder extends Document {
  _id: string;
  products: string[];
  sellerId: string;
  buyerId: string;
}

const OrderSchema: Schema = new Schema(
  {
    sellerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = Mongoose.model<IOrder>("Order", OrderSchema, "Orders");

export default Order;

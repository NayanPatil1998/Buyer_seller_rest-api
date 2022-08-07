import Mongoose, { Schema, Document } from "mongoose";
import { IProductModel } from "./product";

export interface IOrder extends Document {
  _id: string;
  products: IProductModel[];
}

const OrderSchema: Schema = new Schema(
  {
    products: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = Mongoose.model<IOrder>("Order", OrderSchema, "Orders");

export default Order;
